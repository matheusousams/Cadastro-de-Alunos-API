# API REST

- O Repositório trata-se de uma API que cria cadastro de Alunos com os seguintes dados:
    - Nome, Sobrenome, E-mail, Idade, Peso, Altura e Fotos.

---

## Tecnologias Utilizadas

### Back-end
- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (Autenticação)**
- **Multer (Uploads)**
- **Postman (Testes de Rotas)**

---

## Instalação
- Instale as dependencias:
```bash
npm install
```

## Configurar .env
-Crie o arquivo .env na raiz do projeto e utilize a configuração abaixo preenchendo com os dados do seu usuário do Postgresql
```bash
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="sua_chave_secreta"
TOKEN_EXPIRATION="tempo_de_expiração_de_token"
```

## Execute o Prisma e aplique as migrações existentes
```bash
npx prisma generate
npx prisma migrate deploy
```

## RUN
```bash
npm start
```