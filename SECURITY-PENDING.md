# Pendências de segurança

Registro de riscos aceitos temporariamente. Nenhum segredo real fica neste arquivo.

## 1. Token de acesso da Meta exposto em comentário no código

- **Onde**: existia em `Send/methods/template.js`, dentro de um bloco de código comentado (chamada de teste a `GET /message_templates`), removido no commit `f22a68b` — o comentário foi apagado, mas **o segredo continua no histórico do Git** enquanto não houver reescrita de histórico.
- **Risco**: alto — quem tiver acesso de leitura ao repositório (ou ao histórico) consegue o token e pode atuar como o número associado a ele.
- **Probabilidade de exploração**: desconhecida (depende da visibilidade do repositório e de quem já teve acesso).
- **Por que não foi corrigido agora**: rotacionar/revogar esse token exige acesso administrativo à conta da Meta responsável pelo Agorabot, que ainda não foi recuperado. Trocar a credencial sem esse acesso pode derrubar o número em produção sem caminho rápido de recuperação.
- **Decisão atual**: aceitar o risco temporariamente. Não ampliar a exposição (não copiar o token pra nenhum lugar novo, não testar chamadas com ele).
- **Mitigação enquanto isso**: nenhuma além de não tocar. Monitorar por atividade anômala na conta, se houver visibilidade pra isso.
- **Responsável pela decisão**: Ramon (dono do acesso à conta Meta).
- **Pré-requisito pra resolver**: acesso de administrador à conta Business Manager / WhatsApp Business Account que gerencia esse número.
- **Procedimento de rotação, quando o acesso for recuperado**:
  1. Gerar um novo access token na Meta (Business Settings → System Users, ou equivalente).
  2. Atualizar o campo `accessToken` da account correspondente diretamente no MongoDB de produção (não no código).
  3. Confirmar que envios/recebimentos continuam funcionando com o novo token.
  4. Só depois disso, revogar o token antigo na Meta.
  5. Avaliar se vale reescrever o histórico do Git pra remover o segredo definitivamente (`git filter-repo` ou equivalente) — isso invalida clones existentes e precisa ser coordenado com todo mundo que tem o repo localmente.

## 2. `accessToken` armazenado em texto puro no MongoDB

- **Onde**: `MongoDB/schemas/accounts.js`, campo `accessToken` — sem criptografia em repouso.
- **Risco**: médio-alto — qualquer acesso de leitura ao banco (ou a um backup) expõe os tokens de todas as contas conectadas, não só do Jarvis.
- **Decisão atual**: não resolvido, fora do escopo desta rodada (era sobre a entrada do Jarvis, não sobre re-arquitetar armazenamento de credencial).
- **Mitigação futura sugerida**: criptografar o campo com uma chave própria (fora do Mongo, ex.: variável de ambiente do backend) antes de gravar, e descriptografar só no momento do envio.

## 3. Cadastro do Jarvis ainda não executado

- `scripts/register-jarvis-account.js` está pronto e é idempotente (não cria duplicata, não sobrescreve conta existente), mas **não foi executado** — falta receber via variável de ambiente: `JARVIS_ACCESS_TOKEN` (token real da Meta pro número do Jarvis), `JARVIS_LOGIN_PASSWORD` (senha de login do painel, será hasheada), `JARVIS_ADM_NUMBERS` (quem pode dar comando administrativo pelo WhatsApp do Jarvis).
