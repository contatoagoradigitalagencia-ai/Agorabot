import main from "./main.js";

const { server } = await main();

server.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));

// ACHO Q EU VOU VOLTAR COMO ERA ANTES