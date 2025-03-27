# Usando a imagem oficial do Node.js como base
FROM node:20-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de configuração do projeto (package.json, package-lock.json) para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Instalar o Quasar CLI globalmente
RUN npm install -g @quasar/cli

# Copiar todo o código do projeto para o container
COPY . .

# Expor a porta onde a aplicação será servida
EXPOSE 3000

# Comando para rodar o servidor após o build
CMD ["quasar", "dev", "--host", "0.0.0.0", "--port", "3000", "--no-hmr"]
