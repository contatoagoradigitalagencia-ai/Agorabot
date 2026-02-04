import socket from "../Socket/Socket.js";

/**
 * @author VAMPETA
 * @brief CONFIGURA A CLASSE Socket
 * @param {Object} io INSTANCIA PRINCIPAL DO Socket.IO
*/
export default async function configSocket(io) {
	socket.init(io);
}