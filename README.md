Documentacao que ainda sera construida

ROTAS:
    GET /webhook
    POST /webhook
    POST /login


WEBSOCKET:
    ON:
        connection
        disconnect
		messages:load_messages
		messages:reply_window
		messages:quick_messages
		messages:send_text
		messages:send_location
		config:bot:on_off

    EMIT:
		messages:new_message
		messages:update_view
		messages:new_react