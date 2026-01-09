import mongodb from "../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O MONGODB
*/
export default async function connectMongoDB() {
	try {
		await mongodb.connect();
	} catch (error) {
		console.log("\x1b[33mErro ao conectar ao MongoDB\x1b[0m");
		process.exit(1);
	}
}