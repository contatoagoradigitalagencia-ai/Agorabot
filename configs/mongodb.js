import mongoose from "mongoose";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O MONGODB
*/
export default async function connectMongoDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI);	
	} catch (error) {
		console.log("Erro ao conectar ao MongoDB");
	}
}
