# Jitterbit Challenge API

Esta é uma API desenvolvida para o desafio Jitterbit, focada na gestão de pedidos (Orders) e itens, com suporte a autenticação JWT e documentação Swagger.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/) (MySQL2)
- [JSON Web Token (JWT)](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Swagger (swagger-jsdoc & swagger-ui-express)](https://swagger.io/)
- [Nodemon](https://nodemon.io/) (Desenvolvimento)

## 📋 Pré-requisitos

- **Node.js**: v14 ou superior.
- **MySQL**: Servidor rodando localmente ou remotamente.

## ⚙️ Configuração

1.  **Clone o repositório**:

    ```bash
    git clone <url-do-repositorio>
    cd Jitterbit-challenge
    ```

2.  **Instale as dependências**:

    ```bash
    npm install
    ```

3.  **Configure o arquivo `.env`**:
    Crie um arquivo `.env` na raiz do projeto seguindo o modelo abaixo:

    ```env
    PORT=3000
    NODE_ENV=development

    # Configuração do Banco de Dados
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_NAME=jitterbit_challenge

    # Chave para o JWT
    JWT_SECRET=sua_chave_secreta_jwt
    ```

4.  **Inicialize o banco de dados**:
    Certifique-se de que o banco `jitterbit_challenge` exista no MySQL. A API cuidará da criação das tabelas ao ser iniciada ou utilize o script `src/config/initDb.js` se houver um script de migração.

## 🏃 Como rodar

- **Desenvolvimento (com reload automático)**:
  ```bash
  npm run dev
  ```
- **Produção**:
  ```bash
  npm start
  ```

## 📖 Documentação da API (Swagger)

A documentação interativa da API está disponível via Swagger. Após iniciar o servidor, acesse:
`http://localhost:3000/api-docs`

## 🔐 Autenticação

A maioria dos endpoints requer autenticação via Bearer Token.

1.  Realize o login via `POST /api/login`.
2.  Copie o `token` retornado.
3.  Adicione o token no header das requisições como: `Authorization: Bearer <seu-token>`.

## 📌 Endpoints Principais

| Método   | Endpoint          | Descrição                            | Autenticação |
| :------- | :---------------- | :----------------------------------- | :----------- |
| `POST`   | `/api/login`      | Realiza o login e retorna o JWT      | Não          |
| `GET`    | `/api/order/list` | Lista todos os pedidos               | Sim          |
| `GET`    | `/api/order/:id`  | Retorna um pedido específico pelo ID | Sim          |
| `POST`   | `/api/order`      | Cria um novo pedido e seus itens     | Sim          |
| `PUT`    | `/api/order/:id`  | Atualiza um pedido existente         | Sim          |
| `DELETE` | `/api/order/:id`  | Remove um pedido pelo ID             | Sim          |

---

Desenvolvido para o desafio Jitterbit.
