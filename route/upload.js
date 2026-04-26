import cloudflareR2 from "../Cloudflare R2/CloudflareR2.js";

/**
 * @author VAMPETA
 * @brief ROTA USADA PARA RECEBER ARQUIVOS E SALVAR NO CLOUDFLARE R2
 * @method POST
 * @route /upload
 * @param {Object} req.file ARQUIVO ENVIADO PARA SER SALVO
 * @returns 200 - ARQUIVO SALVO COM SUCESSO
 * @returns 400 - ARQUIVO NAO ENVIADO
 * @returns 500 - ERRO INTERNO AO SALVAR O ARQUIVO NO CLOUDFLARE R2
*/
export default async function upload(req, res) {
	if (!req.file || !req.file.buffer || !req.file.mimetype) return (res.sendStatus(400));
	const url = await cloudflareR2.uploadQuickMessage(req.account.idPhone, req.file.buffer, req.file.mimetype);
	if (!url) return (res.sendStatus(500));
	res.status(200).json({ url: url });
}