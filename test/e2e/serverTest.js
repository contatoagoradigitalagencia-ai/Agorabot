import axios from "axios";
import { io } from "socket.io-client";

import configExpress from "../../configs/express.js";
import configAxios from "../../configs/axios.js";
import configDotenv from "../../configs/dotenv.js";
import connectMongoDB from "../../configs/mongodb.js";
import connectCloudflareR2 from "../../configs/cloudflare r2.js";
import connectGoogleSheets from "../../configs/google sheets.js";
import connectIA from "../../configs/IA.js";
import configWebSocket from "../../configs/websocket.js";
import configSocket from "../../configs/socket.js";

import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO PRINCIPAL QUE INICIAL O SERVIDOR PARA TESTES E2E
*/
async function start() {
	configDotenv();
	configAxios();
	if (this.config.mongoDB) await connectMongoDB();
	if (this.config.cloudFlareR2) await connectCloudflareR2();
	if (this.config.googleSheets) await connectGoogleSheets();
	if (this.config.IA) await connectIA();
	this.app = configExpress();
	const { server, io } = configWebSocket(this.app);
	this.io = io;
	configSocket(this.io);
	await new Promise((resolve) => this.server = server.listen(3001, resolve));
	this.url = "http://localhost:3001";
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE FECHA O SERVIDOR DE TESTES E2E
*/
async function stop() {
	if (this.io) this.io.close();
	await new Promise((resolve) => this.server.close(resolve));
	if (this.config.mongoDB) await mongodb.mongodb.connection.close();
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE GERA O TOKEN PARA SE CONECTAR AO WEBSOCKET
*/
async function login() {
	const res = await axios({
		method: "POST",
		url: `${this.url}/login`,
		data: {
			phone: process.env.PHONE_TEST,
			password: process.env.PASSWORD_TEST
		}
	});

	if (res.status !== 200) throw new Error("Falha ao autenticar usuário de teste");
	this.token = res.data.token;
}

/**
 * @author VAMPETA
 * @brief METODO PARA CONECTAR AO WEBSOCKET
*/
async function connect() {
	this.socket = io(this.url, {
		auth: {
			token: this.token
		},
		transports: ["websocket"]
	});

	await new Promise((resolve, reject) => {
		this.socket.once("connect", resolve);
		this.socket.once("connect_error", reject);
	});
}

/**
 * @author VAMPETA
 * @brief METODO PARA DESCONECTAR DO WEBSOCKET
*/
function disconnect() {
	if (this.socket) {
		this.socket.disconnect();
		this.socket = null;
	}
}

/**
 * @author VAMPETA
 * @brief METODO QUE TRANSFORMA O EVENTO EMIT EM UMA PROMISSE E RETORNA A RESPOSTA
 * @param {String} event NOME DO EVENTO
 * @param {Object} data INFORMACOES ENVIADAS PARA O SERVIDOR
*/
function emit(event, data) {
	return (new Promise((resolve) => this.socket.emit(event, data, resolve)));
}

/**
 * @author VAMPETA
 * @brief CLASSE QUE CONTROLA O ESTADO DO SERVIDOR DE TESTE E2E
*/
export default class Server {
	constructor({ mongoDB = false, cloudFlareR2 = false, googleSheets = false, IA = false }) {
		this.config = {
			mongoDB: mongoDB,
			cloudFlareR2: cloudFlareR2,
			googleSheets: googleSheets,
			IA: IA
		};
		this.app = null;
		this.server = null;
		this.io = null;
		this.url = null;
		this.token = null;
		this.socket = null;

		this.start = start.bind(this);
		this.stop = stop.bind(this);
		this.login = login.bind(this);
		this.connect = connect.bind(this);
		this.disconnect = disconnect.bind(this);
		this.emit = emit.bind(this);
	}
}