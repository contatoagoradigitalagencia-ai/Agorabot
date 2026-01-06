import mongoose from "mongoose";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O MONGODB
*/
export default async function connectMongoDB() {
	if (mongoose.connection.readyState === 1) return ;
	try {
		await mongoose.connect(process.env.MONGO_URI);
	} catch (error) {
		console.log("\x1b[33mErro ao conectar ao MongoDB\x1b[0m");
		process.exit(1);
	}
	mongoose.connection.on("disconnected", () => {
		console.error("\x1b[31mMongoDB desconectado\x1b[0m");
	});
}