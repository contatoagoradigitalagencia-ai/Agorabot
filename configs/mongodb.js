import Mongodb from "../MongoDB/Mongodb.js";

let mongodb = null;

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O MONGODB
*/
async function connectMongoDB() {
	try {
		mongodb = new Mongodb();
		await mongodb.connect();
	} catch (error) {
		console.log("\x1b[33mErro ao conectar ao MongoDB\x1b[0m");
		process.exit(1);
	}
}

export { mongodb, connectMongoDB };