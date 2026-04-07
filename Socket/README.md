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



# Rota /dashboard

## ON dashboard:info

Carrega métricas de uma data mencionada pelo usuário.

* Se **nenhuma data for enviada**, retorna **{ error: "Data ausente" }**.
* Se `date` for enviado e inválido, retorna os **{ error: "Data inválida" }**.
* Se a data mencionada não houver métricas, retorna métricas zeradas.

### Payload

```json
{
    "date": "2026-01-08"
}
```

---

### Campos

| Campo                    | Tipo     | Obrigatório | Descrição                                                                                          |
|--------------------------|----------|-------------|----------------------------------------------------------------------------------------------------|
| `date`                   | `string` | Sim         | Data de consulta das métricas.                                                                     |

---

### Callback

```json
{
    "timestamp": "2026-01-08",
    "hourly": {
        "0": 0,
        "1": 0,
        "2": 0,
        ...
        "22": 0,
        "23": 0,
        "24": 0
    },
    "received": {
        "text": 0,
        "sticker": 0,
        "audio": 0,
        ...
    },
    "sent": {
        "text": 0,
        "sticker": 0,
        "audio": 0,
        ...
    },
    "newContacts": 0
}
```

---

### Retorno

| Campo        | Tipo               | Descrição                                                                                                          |
|--------------|--------------------|--------------------------------------------------------------------------------------------------------------------|
| `timestamp`  | `string`           | Data de consulta das métricas.                                                                                     |
| `hourly`     | `object`           | Horas e quantidades de mensagens recebidas naquela hora.                                                           |
| `received`   | `object`           | Mensagens recebidas separadas por tipos.                                                                           |
| `sent`       | `object`           | Mensagens enviadas separadas por tipos.                                                                            |
| `newContact` | `number`           | Novos contatos que iniciaram conversa pela primeria vez.                                                           |

---



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

## ON chats:update_human_viewed

Recebe a informação do front-end que o chat foi aberto por um humano

### Payload

```json
{
    "phone": "5521999999999"
}
```

---

### Campos

| Campo   | Tipo     | Obrigatório | Descrição                                                                                                           |
|---------|----------|-------------|---------------------------------------------------------------------------------------------------------------------|
| `phone` | `string` | Sim         | Número do contato.                                                                                                  |

---

## EMIT chat:new_message

Emitido quando uma nova mensagem é enviada ou recebida.

### Payload

```json
{
    "idPhone": "65e1f4c3b9e8f12d4c0e9a11",
    "phone": "5521999999999",
    "timestamp": 1700000000,
    "direction": "inbound",
    "wamid": "wamid.HBgL...",
    "data": {
        "type": "...",
        ...
    }
}
```



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

---

## ON chats:update_human_viewed

Recebe a informação do front-end que o chat foi aberto por um humano

### Payload

```json
{
    "phone": "5521999999999"
}
```

---

### Campos

| Campo   | Tipo     | Obrigatório | Descrição                                                                                                           |
|---------|----------|-------------|---------------------------------------------------------------------------------------------------------------------|
| `phone` | `string` | Sim         | Número do contato.                                                                                                  |

---

## ON chat:reply_window

Verifica se a janela de resposta do WhatsApp (24h) ainda está aberta.

### Payload

```json
{
    "phone": "5521999999999"
}
```

---

### Campos

| Campo   | Tipo     | Obrigatório | Descrição                                                                                                           |
|---------|----------|-------------|---------------------------------------------------------------------------------------------------------------------|
| `phone` | `string` | Sim         | Número do contato.                                                                                                  |

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
    {
        "type": "text",
        "text": "Olá, como posso ajudar?"
    },
    {
        "type": "location",
        "location": {
            ...
        }
    }
]
```

---

## ON chat:send:text

Envia uma mensagem de texto.

### Payload

```json
{
    "phone": "5521999999999",
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

## ON chat:info_contact

Consulta os dados de um contato.

### Payload

```json
{
    "phone": "5521999999999"
}
```

---

### Campos

| Campo      | Tipo      | Obrigatório | Descrição                                                                                                       |
|------------|-----------|-------------|-----------------------------------------------------------------------------------------------------------------|
| `phone`    | `string`  | Sim         | Número do chat.                                                                                                 |

---

### Callback

```json
200
```

## EMIT chat:new_message

Emitido quando uma nova mensagem é enviada ou recebida.

### Payload

```json
{
    "idPhone": "65e1f4c3b9e8f12d4c0e9a11",
    "phone": "5521999999999",
    "timestamp": 1700000000,
    "direction": "inbound",
    "wamid": "wamid.HBgL...",
    "data": {
        "type": "...",
        ...
    }
}
```

---

## EMIT chat:update_view

Atualiza o status de visualização da mensagem.

### Payload

```json
{
    "phone": "5521999999999",
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

---



---
---
---
---
---



# Rota /contacts

## ON contacts:load_contacts

Carrega os contatos da conta.

### Payload

```json
{}
```

### Callback

```json
[
    {
        "idPhone": "999999999999999",
        "phone": "5521999999999",
        "name": "Ramon",
        "lastMessage": 1970-01-01T00:00:0.000Z,
        "comment": ""
    },
    {
        "idPhone": "888888888888888",
        "phone": "5521888888888",
        "name": "José",
        "lastMessage": 1998-01-08T00:00:00.000Z,
        "comment": "Esse cara é o desenvolvedor deste site"
    },
    {
        "idPhone": "777777777777777",
        "phone": "5521777777777",
        "name": "",
        "lastMessage": 1952-12-21T00:00:00.000Z,
        "comment": ""
    }
]
```

---

## ON contacts:save_comment

Salva o comentário em um contato.

### Payload

```json
{
    "phone": "5521999999999",
    "comment": "Comentário"
}
```

---

### Campos

| Campo      | Tipo     | Obrigatório | Descrição                                                                                                         |
|------------|----------|-------------|-------------------------------------------------------------------------------------------------------------------|
| `phone`    | `string` | Sim         | Número do contato.                                                                                                |
| `comment`  | `string` | Sim         | Novo comentário do contato.                                                                                       |

---

### Callback

```json
200
```



---
---
---
---
---



# Rota /spreadsheets

## ON spreadsheets:get_spreadsheets

Carrega as páginas existentes e quais estão alimentando a IA.

### Payload

```json
{}
```

---

### Callback

```json
[
    {
        "page": "Página1",
        "active": false
    },
    {
        "page": "dev",
        "active": true
    },
    {
        "page": "teste",
        "active": false
    },
]
```






## ON spreadsheets:update_used_spreadsheets

Informa ao servidor que uma página da planilha começou ou deixou de alimentar a IA.

### Payload

```json
{
    "add" OU "remove": "Página2"
}
```

---

### Campos

| Campo     | Tipo     | Obrigatório | Descrição                                                                                                         |
|-----------|----------|-------------|-------------------------------------------------------------------------------------------------------------------|
| `add`     | `string` | Não         | Nome da página a ser adicionada na alimentada da produção de resposta de IA.                                      |
| `remove`  | `string` | Não         | Nome da página a ser removida na alimentada da produção de resposta de IA.                                        |

---

### Callback

```json
[
    {
        "page": "Página1",
        "active": false
    },
    {
        "page": "dev",
        "active": true
    },
    {
        "page": "teste",
        "active": false
    },
]
```

---