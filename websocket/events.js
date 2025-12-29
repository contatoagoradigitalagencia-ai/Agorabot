import sockets from "./sockets.js";
import contacts from "./contacts.js";
import open_chat from "./open-chat.js";

/**
 * @author VAMPETA
 * @brief ATUALIZA O MAPA DE SOCKETS COM O NOVO SOCKET CONECTADO
 * @param socket OBJETO SOCKET DO CLIENTE
*/
function updateSockets(socket) {
	const { phone } = socket.handshake.auth;

	if (!sockets.has(phone)) sockets.set(phone, new Set());
	sockets.get(phone).add(socket.id);
console.log("Conectado   ", "\x1b[34m==>\x1b[0m", "id:", socket.id, "phone:", phone);
}

/**
 * @author VAMPETA
 * @brief REMOVE O SOCKET DO MAPA DE SOCKETS
 * @param socket OBJETO SOCKET DO CLIENTE
*/
function disconnect(socket) {
	const { phone } = socket.handshake.auth;

	if (!sockets.get(phone)) return ;
	sockets.get(phone).delete(socket.id);
	if (sockets.get(phone).size === 0) sockets.delete(phone);
console.log("Desconectado", "\x1b[33m==>\x1b[0m", "id:", socket.id, "phone:", phone);
}

/**
 * @author VAMPETA
 * @brief CONFIGURA EVENTOS DO WEBSOCKET
 * @param io OBJETO IO DO SOCKET.IO
*/
export default async function configEvents(io) {
	io.on("connection", async (socket) => {
		updateSockets(socket);

		socket.on("contacts", contacts);
		socket.on("open_chat", open_chat);

		setInterval(() => {
			socket.emit("new_message", {
				phone: "5521971178764",
				lastMessage: {
					text: "nova mensagem",
					humanViewed: false,
					status: "read",
					timestamp: new Date()
				}
			});
		}, 5000);

		socket.on("disconnect", () => disconnect(socket));
	});
}