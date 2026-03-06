### Rota de autenticação da META
```https
    GET /webhook
```

---

### Parâmetros de Query
| Parâmetro          | Tipo     | Obrigatório | Descrição                                                                                                |
|--------------------|----------|-------------|----------------------------------------------------------------------------------------------------------|
| `hub.mode`         | `string` | Sim         | Tipo da operação solicitada pela Meta. Durante a verificação do webhook o valor enviado será subscribe.  |
| `hub.verify_token` | `string` | Sim         | Token usado para validar a autenticidade da requisição.                                                  |
| `hub.challenge`    | `string` | Sim         | Código de desafio que deve ser retornado na resposta.                                                    |

---

### Respostas
| Código | Descrição                                                                                                                                     |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `200`  | Autenticação bem sucedida.                                                                                                                    |
| `403`  | Tipo de operação inesperada ou token inválido.                                                                                                |

---

### Exemplo de Requisição
```https
GET /webhook?hub.mode=subscribe&hub.verify_token=123&hub.challenge=12345
```

### Exemplo de Resposta (status 200)
```https
HTTP/1.1 200
Content-Type: text/plain

12345
```



---
---
---
---
---



### Rota de recebimento de mensagens e eventos da META
```https
    POST /webhook
```

---

### Cabeçalhos (Headers)
| Parâmetro             | Tipo     | Obrigatório | Descrição                                                                                             |
|-----------------------|----------|-------------|-------------------------------------------------------------------------------------------------------|
| `x-hub-signature-256` | `string` | Sim         | .                       |

---

### Parâmetros do Body
| Parâmetro | Tipo     | Obrigatório | Descrição                                                                                                         |
|-----------|----------|-------------|-------------------------------------------------------------------------------------------------------------------|
| `object`  | `string` | Sim         | Tipo do objeto enviado pela Meta. Esperado: whatsapp_business_account.                                            |
| `entry`   | `string` | Sim         | Lista de eventos enviados pelo WhatsApp.                                                                          |

---

### Respostas
| Código | Descrição                                                                                                                                     |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `200`  | Evento recebido e processado.                                                                                                                 |
| `403`  | Header "x-hub-signature" inválido ou body vazio.                                                                                              |

---

### Exemplo de Requisição
```https
POST /webhook
x-hub-signature-256: 12345
Content-Type: application/json

{
    "object": "whatsapp_business_account",
    "entry": [
        {
            "id": "123456789",
            "changes": [
                {
                    "value": {
                        "messaging_product": "whatsapp",
                        "messages": [
                            {
                                "from": "5521999999999",
                                "id": "123",
                                "timestamp": "12345",
                                "text": {
                                    "body": "texto"
                                },
                                "type": "text"
                            }
                        ]
                    },
                    "field": "messages"
                }
            ]
        }
    ]
}
```

### Exemplo de Resposta (status 200)
```https
HTTP/1.1 200 OK
```



---
---
---
---
---



### Rota de login
```https
    POST /login
```

---

### Parâmetros do Body
| Parâmetro  | Tipo     | Obrigatório | Descrição                                                                                                        |
|------------|----------|-------------|------------------------------------------------------------------------------------------------------------------|
| `phone`    | `string` | Sim         | Número de WhatsApp.                                                                                              |
| `password` | `string` | Sim         | Senha de acesso.                                                                                                 |

---

### Respostas
| Código | Descrição                                                                                                                                     |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `200`  | Login feito com sucesso.                                                                                                                      |
| `400`  | Campo "phone" ou "password" ausente.                                                                                                          |
| `401`  | "phone" ou "password" incorreto.                                                                                                              |

---

### Exemplo de Requisição
```https
POST /login
Content-Type: application/json

{
    "phone": "5521999999999",
    "password": "123"
}
```

### Exemplo de Resposta (status 200)
```https
HTTP/1.1 200

{
    "idPhone": "12345"
    "token": "54321"
}
```