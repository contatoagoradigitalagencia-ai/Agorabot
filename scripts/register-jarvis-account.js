import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Account from "../MongoDB/schemas/accounts.js";

// Cadastro idempotente da account do Jarvis — NÃO tem dado sensível
// escrito aqui. Tudo vem de variáveis de ambiente lidas na hora de
// rodar. Se a account já existir (mesmo idPhone), o script não
// sobrescreve nada, só avisa e sai.
//
// Uso:
//   MONGO_URI=... \
//   JARVIS_PHONE=+15559909031 \
//   JARVIS_ID_PHONE=1292960470556180 \
//   JARVIS_ACCESS_TOKEN=... \
//   JARVIS_LOGIN_PASSWORD=... \
//   JARVIS_ADM_NUMBERS=5521999999999,5521888888888 \
//   node scripts/register-jarvis-account.js
//
// Nenhuma dessas variáveis tem valor default sensível — se faltar
// alguma, o script para antes de conectar no banco.

dotenv.config({ quiet: true });

const REQUIRED = ["MONGO_URI", "JARVIS_PHONE", "JARVIS_ID_PHONE", "JARVIS_ACCESS_TOKEN", "JARVIS_LOGIN_PASSWORD"];

function mask(value) {
	if (!value || value.length < 6) return ("***");
	return (`${value.slice(0, 3)}***${value.slice(-3)}`);
}

async function main() {
	const missing = REQUIRED.filter((key) => !process.env[key]);
	if (missing.length) {
		console.log(`\x1b[33mFaltando variável(is) de ambiente: ${missing.join(", ")}\x1b[0m`);
		process.exit(1);
	}

	const phone = process.env.JARVIS_PHONE;
	const idPhone = process.env.JARVIS_ID_PHONE;
	const accessToken = process.env.JARVIS_ACCESS_TOKEN;
	const password = process.env.JARVIS_LOGIN_PASSWORD;
	const adm = (process.env.JARVIS_ADM_NUMBERS || "").split(",").map((n) => n.trim()).filter(Boolean);

	await mongoose.connect(process.env.MONGO_URI);

	try {
		const existing = await Account.findOne({ idPhone }).select("_id phone idPhone");
		if (existing) {
			console.log(`\x1b[33mJá existe uma account com idPhone ${idPhone} (phone ${existing.phone}) — nada foi alterado.\x1b[0m`);
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const account = await Account.create({
			phone,
			idPhone,
			accessToken,
			login: { password: hashedPassword },
			adm,
			// Sem googleSheets — campo opcional (ver migration que tornou
			// isso possível). Jarvis é transacional, não usa planilha.
			bot: {
				activated: false, // sem IA conversacional — só envio/recebimento e status
				visualization: true,
				model: "none", // required no schema; sem efeito com activated=false
				historySize: 0,
				maxTokens: 0
			}
		});

		console.log(`\x1b[32mAccount do Jarvis criada: _id=${account._id}, phone=${mask(phone)}, idPhone=${idPhone}, adm=[${adm.length} número(s)]\x1b[0m`);
	} finally {
		await mongoose.disconnect();
	}
}

main().catch((error) => {
	console.log("\x1b[31mErro ao cadastrar a account do Jarvis:\x1b[0m", error.message);
	process.exit(1);
});
