import axios from "axios";

import readMessage from "../../../../send_message/read-message.js";
import reactMessage from "../../../../send_message/react-message.js";
import sendText from "../../../../send_message/send-text.js";

import { Chat, Message } from "../../../../MongoDB/schema.js";
import { saveTextReceived, saveTextSent } from "../../../../MongoDB/text.js";

import sockets from "../../../../websocket/sockets.js";


async function pokeApi(message) {	// CONSULTA A POKEAPI E ENVIA A IMAGEM E STATS DO POKEMON
	const res = await axios({
		method: "GET",
		url: "https://pokeapi.co/api/v2/pokemon/" + message.text.body
	});

	if (res.status !== 200) return (sendText(message.from, "Pokemon nao encontrado"));
	const stats = Object.fromEntries(res.data.stats.map((s) => [s.stat.name, s.base_stat]));
	sendImage(message.from, res.data.sprites.front_default, `Nome: ${res.data.name}\nHp: ${stats.hp}\nAttck: ${stats.attack}\nDefense: ${stats.defense}\nSpeed: ${stats.speed}`);
}

async function test(value, message) {
	console.log("Name:", value.contacts[0]?.profile?.name);
	console.log("Number:", message.from);
	const date = new Date(Number(message.timestamp) * 1000);
	const dia = date.getDate();
	const mes = date.getMonth() + 1;
	const ano = date.getFullYear();
	const hora = date.getHours();
	const minuto = date.getMinutes();
	console.log("Data", `${hora}:${minuto} ${dia}/${mes}/${ano}`);
	console.log("Texto:", message.text.body);
	console.log("\n")
	// reactMessage(message.from, message.id, "👍");

	// await pokeApi(message);
	// sendText(message.from, `Nome: ${res.data.name}\nHp: ${stats.hp}\nAttck: ${stats.attack}\nDefense: ${stats.defense}\nSpeed: ${stats.speed}`);
	// sendImage(message.from, res.data.sprites.front_default, `Nome: ${res.data.name}\nHp: ${stats.hp}\nAttck: ${stats.attack}\nDefense: ${stats.defense}\nSpeed: ${stats.speed}`);
	// sendLocation(message.from);
	// sendButons(message.from);	// AINDA NAO CONFIGUREI PARA INTERPRETAR A RESPOSTA DESSE TIPO DE MENSAGEM
	// sendList(message.from);		// AINDA NAO CONFIGUREI PARA INTERPRETAR A RESPOSTA DESSE TIPO DE MENSAGEM
}

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "text"
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function text(value, message) {
	test(value, message);

	readMessage(message.id);
	await saveTextReceived(message.id, message.from, message.text.body);
	const wamid = await sendText(message.from, "Mensagem recebida com sucesso!");
	if (wamid) await saveTextSent(wamid, message.from, "Mensagem recebida com sucesso!");


	// const teste = sockets.get(message.from);
	// console.log(teste)
	console.log(value)
}