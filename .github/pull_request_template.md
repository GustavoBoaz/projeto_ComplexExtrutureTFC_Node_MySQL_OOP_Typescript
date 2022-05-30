> Checklist
- [ ] Estou usando `node` na versão `16.15.0 LTS`
- [ ] Estou usando `docker-compose` na versão `ˆ1.29.2`
- [ ] Configurei minha `Dockerfile` do _frontend_ e do _backend_, copiando arquivos, instalando dependências e rodando a aplicação
- [ ] No `docker-compose.yml`:
  - [ ] As portas dos serviços foram mapeadas
  - [ ] Os containers estão nomeados (container-name)
- [ ] O comando `docker-compose up --build` roda sem erros no banco, no _back_ e no _front_
- [ ] Listei todas as dependências que usei extras (joi, boom, express-async-errors...) no backend em `app/backend/packages.npm`
- [ ] A _migration_ `app/backend/src/database/migrations/99999999999999-create-z.js` roda sem problemas quando se executa `npm run db:reset`
- [ ] Se já fiz outras _migrations_ e _models_, renomeei as seeders, retirando os `_` do nome dos arquivos, mudando o padrão de `20211116145440-teams.js_` para `20211116145440-teams.js`