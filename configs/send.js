import send from "../Send/Send.js";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O MONGODB
*/
export default function configSend(io) {
	send.saveIo(io);
}