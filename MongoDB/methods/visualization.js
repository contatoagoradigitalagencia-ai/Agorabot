import socket from "../../Socket/Socket.js";

// Ordem real do ciclo de vida (Meta pode reentregar/atrasar webhooks —
// "read" chegar antes de "delivered" já foi observado). Sem isso, o
// evento mais recente sempre vencia, podendo regredir "read" de volta
// pra "delivered". "failed" fica no topo por ser terminal.
const STATUS_RANK = { sent: 1, delivered: 2, played: 3, read: 3, failed: 4 };

function rankSwitch(field) {
	return {
		$switch: {
			branches: Object.entries(STATUS_RANK).map(([key, rank]) => ({ case: { $eq: [field, key] }, then: rank })),
			default: 0
		}
	};
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR STATUS DE RECEBIDO E VISUALIZADO NO MONGODB
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE VAI MUDAR O STATUS
 * @param status STATUS DA MENSAGEM
*/
export async function saveVisualization(idPhone, wamid, phone, status) {
	const incomingRank = STATUS_RANK[status] ?? 0;

	try {
		await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					"lastMessage.status": status
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveVisualization": ${error}`);
	}
	try {
		// Update via pipeline: só aplica o novo status se ele avançar o
		// ciclo (nunca regride read->delivered por causa de um evento
		// atrasado). deliveredAt/readAt gravados na primeira vez que
		// cada etapa é vista.
		await this.Message.updateOne(
			{ wamid: wamid },
			[
				{
					$set: {
						status: { $cond: [{ $gt: [incomingRank, rankSwitch("$status")] }, status, "$status"] },
						...(status === "delivered" ? { deliveredAt: { $ifNull: ["$deliveredAt", new Date()] } } : {}),
						...(status === "read" ? { readAt: { $ifNull: ["$readAt", new Date()] } } : {})
					}
				}
			],
			// Mongoose 9 passou a exigir essa flag explícita pra aceitar
			// array (pipeline update) — sem ela, TODA chamada falhava
			// silenciosamente (caía no catch, status nunca avançava).
			// Achado só na homologação real, não pegava em node --check.
			{ updatePipeline: true }
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveVisualization": ${error}`);
	}
	try {
		await socket.emit.chat.updateView(idPhone, phone, wamid, status);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveVisualization": ${error}`);
	}
}