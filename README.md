# API Agora Digital

Este repositório documenta todas as rotas da API Agora Digital, incluindo exemplos de requisição, resposta, autenticação e detalhes técnicos.


## Documentações de requisições http

### Login
| Rota                                                                      | Descrição                                                                  |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [GET `/webhook`](./route/README.md)                                       | Rota utilizada pela META para verificar e validar o webhook da aplicação.  |
| [POST `/webhook`](./route/README.md)                                      | Recebe eventos e mensagens enviados pela API oficial do WhatsApp.          |
| [POST `/login`](./route/README.md)                                        | Login do usuário.                                                          |


## Documentações de conexões WebSockets

### 
| Evento                                                                    | Descrição                                                                  |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [ON `connection`](./Socket/README.md)                                     | Disparado quando um cliente estabelece conexão com o servidor WebSocket.   |
| [ON `disconnect`](./Socket/README.md)                                     | Disparado quando um cliente se desconecta do servidor.                     |

### Rota `/chat` do front-end 
| Evento                                                                    | Descrição                                                                  |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [ON `chats:load_chats`](./Socket/README.md)                               | Solicita a lista de chats do usuário com suporte a paginação.              |
| [ON `chats:update_human_viewed`](./Socket/README.md)                      | Informa que o chat foi aberto por um humano.                               |
| [EMIT `chat:new_message`](./Socket/README.md)                             | Atualiza o front-end quando uma nova mensagem é recebida ou enviada.       |

### Rota `/chat/:phone` do front-end 
| Evento                                                                    | Descrição                                                                  |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [ON `chat:load_messages`](./Socket/README.md)                             | Solicita o histórico de mensagens de um chat específico.                   |
| [ON `chats:update_human_viewed`](./Socket/README.md)                      | Notifica abertura do chat por humano quando chega uma nova mensagem.       |
| [ON `chat:reply_window`](./Socket/README.md)                              | Verifica se a janela de resposta de 24h do WhatsApp ainda está aberta.     |
| [ON `chat:quick_messages`](./Socket/README.md)                            | Solicita mensagens rápidas pré-definidas configuradas no sistema.          |
| [ON `chat:send:text`](./Socket/README.md)                                 | Envia uma mensagem de texto para um contato.                               |
| [ON `chat:send:location`](./Socket/README.md)                             | Envia uma mensagem contendo localização geográfica.                        |
| [ON `chat:bot:on_off`](./Socket/README.md)                                | Consulta ou altera o estado do bot automático de um chat.                  |
| [EMIT `chat:new_message`](./Socket/README.md)                             | Atualiza o front-end quando uma nova mensagem é recebida ou enviada.       |
| [EMIT `chat:update_view`](./Socket/README.md)                             | Atualiza o status de visualização de uma mensagem (ex: enviada ou lida).   |
| [EMIT `chat:new_react`](./Socket/README.md)                               | Notifica o front-end sobre uma nova reação em uma mensagem.                |