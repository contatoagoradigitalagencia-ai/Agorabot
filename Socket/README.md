# WebSocket API

Documentação dos eventos utilizados para comunicação em tempo real entre cliente e servidor via **WebSocket (Socket.IO)**.

---

# Conexão

```javascript
import { io } from "socket.io-client";

const socket = io("https://api.exemplo.com");
```



---
---
---
---
---



# Rota /chat

## ON chats:load_chats

Carrega a lista de chats do usuário com **paginação por cursor**.

* Se **nenhum cursor for enviado**, retorna os **15 chats mais recentes**.
* Se `dateLastChat` for enviado, retorna os **15 chats após esse cursor**.
* Cada requisição retorna no máximo **15 chats**.

### Payload

```json
{
    "dateLastChat": {
        "timestamp": "2024-03-10T12:00:00.000Z",
        "_id": "65e1f4c3b9e8f12d4c0e9a11"
    }
}
```

---

### Campos

| Campo                    | Tipo     | Obrigatório | Descrição                                                                                          |
|--------------------------|----------|-------------|----------------------------------------------------------------------------------------------------|
| `dateLastChat`           | `object` | Não         | Cursor usado para carregar mais chats.                                                             |
| `dateLastChat.timestamp` | `string` | Sim         | Timestamp da última mensagem do último chat recebido.                                              |
| `dateLastChat._id`       | `string` | Sim         | ID do chat usado como critério de desempate.                                                       |

* Obrigatório apenas quando `dateLastChat` for enviado.

---

### Callback

```json
{
    "chats": [],
    "hasMore": true,
    "nextCursor": {
        "timestamp": "2024-03-09T15:32:10.000Z",
        "_id": "65e1f4c3b9e8f12d4c0e9a22"
    }
}
```

---

### Retorno

| Campo        | Tipo               | Descrição                                                                                                          |
|--------------|--------------------|--------------------------------------------------------------------------------------------------------------------|
| `chats`      | `array`            | Lista de chats retornados.                                                                                         |
| `hasMore`    | `boolean`          | Indica se existem mais chats.                                                                                      |
| `nextCursor` | `object` OU `null` | Cursor para carregar a próxima página.                                                                             |



---
---
---
---
---



# Rota /chat/:phone

## ON chat:load_messages

Carrega as mensagens de um chat com **paginação por cursor**.

* Se **nenhum cursor for enviado**, retorna as **15 mensagens mais recentes**.
* Se `beforeId` for enviado, retorna as **15 mensagens anteriores a esse cursor**.
* Cada requisição retorna no máximo **15 mensagens**.

### Payload

```json
{
    "phone": "5521999999999",
    "beforeId": "65e1f4c3b9e8f12d4c0e9a11"
}
```

### Campos

| Campo      | Tipo     | Obrigatório | Descrição                                                                                                        |
|------------|----------|-------------|------------------------------------------------------------------------------------------------------------------|
| `phone`    | `string` | Sim         | Número do contato.                                                                                               |
| `beforeId` | `string` | Não         | Cursor para carregar mensagens anteriores.                                                                       |

### Callback

```json
{
    "messages": [],
    "hasMore": true,
    "nextCursor": "65e1f4c3b9e8f12d4c0e9a11"
}
```

### Retorno

| Campo        | Tipo                | Descrição                                                                                                         |
|--------------|---------------------|-------------------------------------------------------------------------------------------------------------------|
| `messages`   | `array`             | Lista de mensagens.                                                                                               |
| `hasMore`    | `boolean`           | Indica se existem mais mensagens.                                                                                 |
| `nextCursor` | `string` OU `null`  | Cursor da próxima página.                                                                                         |
---

## ON chat:reply_window

Verifica se a janela de resposta do WhatsApp (24h) ainda está aberta.

### Payload

```json
{
    "phone": "5521999999999"
}
```

### Callback

```json
true
```

| Valor   | Descrição                                                                                                                                    |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `true`  | Janela aberta.                                                                                                                               |
| `false` | Janela expirada.                                                                                                                             |

---

## ON chat:quick_messages

Retorna mensagens rápidas pré-definidas.

### Payload

```json
{}
```

### Callback

```json
[
    "Olá, como posso ajudar?",
    "Obrigado pelo contato"
]
```

---

## ON chat:send:text

Envia uma mensagem de texto.

### Payload

```json
{
    "phone": "5511999999999",
    "text": "Olá"
}
```

### Campos

| Campo   | Tipo     | Obrigatório | Descrição                                                                                                           |
|---------|----------|-------------|---------------------------------------------------------------------------------------------------------------------|
| `phone` | `string` | Sim         | Número do destinatário.                                                                                             |
| `text`  | `string` | Sim         | Conteúdo da mensagem.                                                                                               |

---

## ON chat:send:location

Envia uma localização.

### Payload

```json
{
    "phone": "5521999999999",
    "latitude": -22.909916052379334,
    "longitude": -43.19812500764271,
    "name": "42 Rio",
    "address": "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
}
```

### Campos

| Campo       | Tipo     | Obrigatório | Descrição                                                                                                       |
|-------------|----------|-------------|-----------------------------------------------------------------------------------------------------------------|
| `phone`     | `string` | Sim         | Número do destinatário.                                                                                         |
| `latitude`  | `number` | Sim         | Latitude.                                                                                                       |
| `longitude` | `number` | Sim         | Longitude.                                                                                                      |
| `name`      | `string` | Não         | Nome do local.                                                                                                  |
| `address`   | `string` | Não         | Endereço.                                                                                                       |

---

## ON chat:bot:on_off

Consulta ou altera o estado do **bot** em um chat.

- Se `stateBot` **não for enviado**, o servidor retorna o **estado atual do bot**.
- Se `stateBot` **for enviado**, o servidor **atualiza o estado do bot** e retorna o novo valor.

### Payload

```json
{
    "phone": "5521999999999",
    "stateBot": true
}
```

### Campos

| Campo      | Tipo      | Obrigatório | Descrição                                                                                                       |
|------------|-----------|-------------|-----------------------------------------------------------------------------------------------------------------|
| `phone`    | `string`  | Sim         | Número do chat.                                                                                                 |
| `stateBot` | `boolean` | Não         | Novo estado do bot. Se omitido, apenas consulta o estado atual.                                                 |

### Callback

```json
true
```

| Valor   | Descrição                                                                                                                                    |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `true`  | Bot ativado.                                                                                                                                 |
| `false` | Bot desativado.                                                                                                                              |

---

## EMIT chat:new_message

Emitido quando uma nova mensagem é enviada ou recebida.

### Payload

```json
{
    "_id": "65e1f4c3b9e8f12d4c0e9a11",
    "phone": "5511999999999",
    "text": "Olá",
    "timestamp": 1700000000,
    "direction": "inbound"
}
```

---

## EMIT chat:update_view

Atualiza o status de visualização da mensagem.

### Payload

```json
{
    "phone": "5511999999999",
    "wamid": "wamid.HBgL...",
    "status": "read"
}
```

### Status possíveis

* sent
* delivered
* read

---

## EMIT chat:new_react

Emitido quando uma mensagem recebe uma reação.

### Payload

```json
{
    "phone": "5521999999999",
    "wamid": "wamid.HBgL...",
    "react": "👍"
}
```

---

## ON chats:update_human_viewed

Notifica o servidor que um humano visualizou o chat.

### Payload

```json
{
    "phone": "5521999999999"
}
```

### Campos

| Campo      | Tipo      | Obrigatório | Descrição                                                                                                       |
|------------|-----------|-------------|-----------------------------------------------------------------------------------------------------------------|
| `phone`    | `string`  | Sim         | Número do chat.                                                                                                 |