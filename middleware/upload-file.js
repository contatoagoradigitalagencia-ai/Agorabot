import multer from "multer";

const upload = multer({
	storage: multer.memoryStorage()
});

/**
 * @author VAMPETA
 * @brief MIDDLEWARE QUE TRATA O RECEBIMENTO DE ARQUIVOS PARA UPLOAD
 * @method POST
 * @route /upload
 * @returns 400 - ARQUIVO NAO ESTIVER COM O NOME "file"
*/
export default function uploadFile(req, res, next) {
	upload.single("file")(req, res, (error) => {
		if (error) return (res.sendStatus(400));
		next();
	});
}