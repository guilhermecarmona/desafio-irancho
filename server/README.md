# Server

### 🌐 Como executar

Instalar dependências

```bash
$ npm install
```

Editar o arquivo config/database.js e inserir os dados do banco de dados
```bash
username: 'USER',
password: 'PASS',
database: 'DB_NAME',
host: '127.0.0.1',
dialect: 'mysql',
```

Criar banco de dados MySQL (com o nome configurado no passo anterior em 'database')
```bash
create database `db_name`;
```

Rodar as migrations
```bash
$ npx sequelize db:migrate
```

Executar

```bash
$ node app
```