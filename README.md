# ⚡ Cache Inteligente com Redis + MySQL usando Node.js e Express

Projeto simples e didático para mostrar como usar **Redis como cache** para acelerar consultas feitas ao **MySQL** usando **Express com Node.js**. Ideal para estudar otimização de performance com banco de dados e simulação de latência.

## 🚀 Tecnologias usadas

- Node.js + TypeScript  
- Express  
- Redis (cache)  
- MySQL (banco de dados)  
- Docker  
- `mysql2` para conexão sem ORM  
- Cache TTL com simulação de banco lento  

## 🛠️ Como rodar o projeto


# 1. Clone o repositório e entre na pasta
git clone https://github.com/M4rcoos/Aula-01-redis.git
cd Aula-01-redis

# 2. Instale as dependências
npm install

# 3. Suba os serviços com Docker
docker run --name redis-cache -p 6379:6379 -d redis
docker run --name mysql-db \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=admin123 \
  -e MYSQL_DATABASE=meubanco \
  -d mysql:8.0
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);
# 4. Rode o seed para popular o banco com 200 usuários
npm run seed

# 5. Compile o TypeScript
npx tsc

# 6. Inicie a aplicação
npm start
