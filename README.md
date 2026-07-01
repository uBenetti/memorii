<p align="center">
  <img src="assets/icon.svg" alt="Memorii" width="180">
</p>

<h1 align="center">Memorii</h1>

<p align="center">
  Sistema de gerenciamento de anotações.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Django-6.0-green">
  <img src="https://img.shields.io/badge/React-19-blue">
  <img src="https://img.shields.io/badge/Vite-8-purple">
  <img src="https://img.shields.io/badge/JWT-Authentication-orange">
</p>

---

# Memorii

Sistema web de gerenciamento de notas desenvolvido como projeto acadêmico utilizando **Django REST Framework** no backend e **React + Vite** no frontend.

O objetivo do projeto é permitir que usuários criem, visualizem, editem e excluam suas próprias anotações de forma segura através de autenticação JWT.

---

## Tecnologias Utilizadas

### Backend
- Python 3
- Django
- Django REST Framework
- Simple JWT
- SQLite (desenvolvimento)
- CORS Headers

### Frontend
- React
- Vite
- Axios
- React Router DOM

### Controle de Versão
- Git
- GitHub

---

## Funcionalidades Implementadas

### Autenticação
- Cadastro de usuários
- Login com JWT
- Geração de Access Token
- Geração de Refresh Token
- Proteção de rotas da API
- Perfil autenticado

### Notas
- Criação de notas
- Listagem de notas do usuário autenticado
- Atualização de notas
- Exclusão de notas
- Isolamento de dados por usuário

### Frontend
- Navegação com React Router
- Tela de Login
- Integração com API Django
- Armazenamento de token no Local Storage
- Dashboard autenticado
- Exibição do usuário logado

---

## Estrutura do Projeto

```text
memorii/
│
├── back/
│   ├── core/
│   ├── notes/
│   ├── manage.py
│   ├── requirements.txt
│   └── db.sqlite3
│
├── front/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Instalação do Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/uBenetti/memorii.git
cd memorii
```

---

## Configuração do Backend

### Acessar a pasta

```bash
cd back
```

### Criar ambiente virtual

```bash
python -m venv venv
```

### Ativar ambiente virtual

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### Instalar dependências

```bash
pip install -r requirements.txt
```

### Executar migrações

```bash
python manage.py migrate
```

### Iniciar servidor

```bash
python manage.py runserver
```

Servidor:

```text
http://127.0.0.1:8000
```

---

## Configuração do Frontend

### Acessar a pasta

```bash
cd front
```

### Instalar dependências

```bash
npm install
```

### Iniciar aplicação

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Endpoints Disponíveis

### Cadastro

```http
POST /api/register/
```

Exemplo:

```json
{
  "username": "usuario",
  "password": "123456"
}
```

---

### Login

```http
POST /api/token/
```

Exemplo:

```json
{
  "username": "usuario",
  "password": "123456"
}
```

Resposta:

```json
{
  "refresh": "token",
  "access": "token"
}
```

---

### Perfil

```http
GET /api/profile/
```

Header:

```http
Authorization: Bearer <access_token>
```

Resposta:

```json
{
  "username": "usuario"
}
```

---

### Notas

#### Listar Notas

```http
GET /api/notes/
```

---

#### Criar Nota

```http
POST /api/notes/
```

Exemplo:

```json
{
  "title": "Minha Nota",
  "content": "Conteúdo da nota",
  "completed": false
}
```

---

#### Atualizar Nota

```http
PUT /api/notes/{id}/
```

---

#### Excluir Nota

```http
DELETE /api/notes/{id}/
```

---

## Segurança

- Autenticação baseada em JWT.
- Endpoints protegidos por token.
- Cada usuário acessa apenas suas próprias notas.
- Tokens enviados através do cabeçalho Authorization.

---

## Próximas Implementações

- Interface completa para gerenciamento de notas.
- Renovação automática de token.
- Integração com PostgreSQL.
- Deploy do backend.
- Deploy do frontend.
- Responsividade para dispositivos móveis.

---

## Autor

**Pedro Benetti**

Estudante de Desenvolvimento de Software Multiplataforma - FATEC Itaquera.

Projeto desenvolvido para fins acadêmicos e aprimoramento prático em desenvolvimento Full Stack com Django e React.

---

## Estado atual:
**🚧 Em Desenvolvimento 🚧**
