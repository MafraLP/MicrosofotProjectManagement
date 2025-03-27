# 🚀 MicrosoftProjectManagement

<p align="center">
  <a href="#-english">English</a> •
  <a href="#-português">Português</a>
</p>

---

## 🇺🇸 English

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-v20.18+-yellow.svg)
![TypeScript](https://img.shields.io/badge/typescript-latest-blue.svg)
![AdonisJS](https://img.shields.io/badge/AdonisJS-latest-purple.svg)
![Quasar](https://img.shields.io/badge/Quasar_Vue_2-latest-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-blue.svg)
![Docker](https://img.shields.io/badge/Docker-required-blue.svg)
![Status](https://img.shields.io/badge/status-development-orange.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A project management solution developed for Aprovafacil's challenge using Microsoft's management principles.

### Features

- Project management dashboard
- Client management
- Team management
- Task allocation and tracking
- Events based on Laravel usage
- Architecture ModelViewController
- Docker containerization for easy deployment

### Requirements

- Node.js (v20.18+)
- Docker & Docker Compose
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YourUsername/MicrosoftProjectManagement.git

# Navigate to project folder
cd MicrosoftProjectManagement

# Add required hosts to /etc/hosts
echo "127.0.0.1 about.mpm clientes.mpm teams.mpm" | sudo tee -a /etc/hosts

# Install backend dependencies
cd mpm-server
npm install

# Install frontend dependencies
cd ../mpm-app
npm install

# Navigate to docker directory and start containers
cd ../docker
docker-compose up
```

### Configuration

The project uses Docker for containerization, with the following containers:

- Frontend (Quasar Vue 2)
- Backend (AdonisJS with TypeScript)
- Database (PostgreSQL)
- Web Server (Nginx)

All configuration is handled through the Docker Compose setup. Environmental variables can be adjusted in the `.env` files in each respective directory.

### Application Structure

- `mpm-app/`: Frontend application built with Quasar Vue 2
- `mpm-server/`: Backend API built with AdonisJS and TypeScript
- `docker/`: Docker configuration files

### Domain Access

After setup, the application will be available at the following URLs:

- `http://about.mpm` - About page
- `http://clientes.mpm` - Client management
- `http://teams.mpm` - Team management
---

## 🇧🇷 Português

![Versão](https://img.shields.io/badge/versão-1.0.0-blue.svg)
![Licença](https://img.shields.io/badge/licença-MIT-green.svg)
![Node](https://img.shields.io/badge/node-v20.18+-yellow.svg)
![TypeScript](https://img.shields.io/badge/typescript-latest-blue.svg)
![AdonisJS](https://img.shields.io/badge/AdonisJS-latest-purple.svg)
![Quasar](https://img.shields.io/badge/Quasar_Vue_2-latest-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-blue.svg)
![Docker](https://img.shields.io/badge/Docker-obrigatório-blue.svg)
![Status](https://img.shields.io/badge/status-em_desenvolvimento-orange.svg)
![PRs](https://img.shields.io/badge/PRs-bem--vindos-brightgreen.svg)

Uma solução de gerenciamento de projetos desenvolvida para o desafio da Aprovafacil utilizando os princípios de gerenciamento da Microsoft.

### Funcionalidades

- Dashboard de gerenciamento de projetos
- Gerenciamento de clientes
- Gerenciamento de equipes
- Alocação e acompanhamento de tarefas
- Containerização com Docker para fácil implantação

### Requisitos

- Node.js (v20.18+)
- Docker & Docker Compose
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SeuUsuario/MicrosoftProjectManagement.git

# Navegue para a pasta do projeto
cd MicrosoftProjectManagement

# Adicione os hosts necessários ao /etc/hosts
echo "127.0.0.1 about.mpm clientes.mpm teams.mpm" | sudo tee -a /etc/hosts

# Instale as dependências do backend
cd mpm-server
npm install

# Instale as dependências do frontend
cd ../mpm-app
npm install

# Navegue para o diretório docker e inicie os contêineres
cd ../docker
docker-compose up
```

### Configuração

O projeto usa Docker para containerização, com os seguintes contêineres:

- Frontend (Quasar Vue 2)
- Backend (AdonisJS com TypeScript)
- Banco de Dados (PostgreSQL)
- Servidor Web (Nginx)

Toda a configuração é gerenciada através do Docker Compose. Variáveis de ambiente podem ser ajustadas nos arquivos `.env` em cada diretório respectivo.

### Estrutura da Aplicação

- `mpm-app/`: Aplicação frontend construída com Quasar Vue 2
- `mpm-server/`: API backend construída com AdonisJS e TypeScript
- `docker/`: Arquivos de configuração do Docker

### Acesso aos Domínios

Após a configuração, a aplicação estará disponível nas seguintes URLs:

- `http://about.mpm` - Página Sobre
- `http://clientes.mpm` - Gerenciamento de clientes
- `http://teams.mpm` - Gerenciamento de equipes

---

<div align="center">
  <sub>Desenvolvido para o desafio da Aprovafacil</sub>
</div>
