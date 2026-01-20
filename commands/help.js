import send from "../Send/Send.js";
import mongodb from "../MongoDB/Mongodb.js";

const text = `
Olá! Abaixo estão os comandos que você pode utilizar e uma breve explicação de cada um:

💾 Comandos gerais:

\`/ajuda\`
Exibe esta mensagem de ajuda com todos os comandos disponíveis.

\`/contatos\`
Lista os números salvos automaticamente quando alguém envia uma mensagem para este bot.



⚙️ Comandos de configuração do bot:

\`/adm\`
Lista os atuais administradores do bot que podem usar comandos.

\`/adicionar_adm\`
Adiciona um novo número como administrador.
Exemplo de uso: */adicionar_adm 55210000000* (Apenas código de país + DDD + número. Sem hífen, espaços ou caracteres especias).

\`/remover_adm\`
Remove um número como administrador.
Exemplo de uso: */remover_adm 55210000000* (Apenas código de país + DDD + número. Sem hífen, espaços ou caracteres especias).

\`/mensagem_não_suportada\`
Exibe o atual avisou do bot para mensagens não suportadas.

\`/nova_mensagem_não_suportada\`
O comando */nova_mensagem_não_suportada <nova mensagem>* substitui a antiga mensagem por <nova mensagem>. Exemplo: */nova_mensagem_não_suportada Oi, infelizmente nosso chat não suporta este tipo de mensagem.*

\`/remover_mensagem_não_suportada\`
Remove o atual aviso de mensagem não suportada.

\`/prompt\`
Exibe o atual prompt que instruí a IA para elaborar respostas.

\`/novo_prompt\`
O comando */novo_prompt <novo prompt>* substitui o antigo prompt por <novo prompt>. Exemplo: */novo_prompt Agora você vai atender clientes de uma pizzaria.*

\`/planilhas\`
Exibe quais planilhas estão alimentando a IA do bot.

\`/adicionar_planilha\`
O comando */adicionar_planilha <nome da planilha>* adiciona mais uma planilha que o bot vai ler antes de responder. Exemplo: */adicionar_planilha produtos*

\`/remover_planilha\`
O comando */remover_planilha <nome da planilha>* remove uma planilha que o bot vai ler antes de responder. Exemplo: */remover_planilha produtos*



📲 Comandos para testar as possibilidades de envio de mensagens atualmente:

\`/todas_mensagens\`
Testa todos os tipos de mensagens.

\`/reaction\`
Testa a reação do WhatsApp.

\`/text\`
Testa mensagens de texto.

\`/image\`
Testa mensagens com imagem.

\`/video\`
Testa mensagens com vídeo.

\`/location\`
Testa mensagens de localização.

\`/contacts\`
Testa mensagens de envio de contato.

\`/button\`
Testa mensagens com botões clicáveis.

\`/list\`
Testa mensagens de lista.

\`/template\` (desabilitado)
Testa templates disponíveis para esse número (precisa de utorização prévia da Meta para criação de templates).
`;

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/help" (TESTA A MENSAGEM DO TIPO "help")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function help(account, message) {
	try {
		await send.text(account, message.from, { text: { body: text } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "help": ${error}`);
	}
}