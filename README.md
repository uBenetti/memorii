<p align="center">
  <img src="assets/icon.svg" alt="Memorii" width="180">
</p>

<h1 align="center">Memorii</h1>

<p align="center">
  Sistema inteligente de gerenciamento de notas e checklists.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Django-5.x-green">
  <img src="https://img.shields.io/badge/Django_REST_Framework-API-red">
  <img src="https://img.shields.io/badge/React-19-blue">
  <img src="https://img.shields.io/badge/Vite-7-purple">
  <img src="https://img.shields.io/badge/JWT-Authentication-orange">
  <img src="https://img.shields.io/badge/Status-In_Development-yellow">
</p>

---

# Memorii

O **Memorii** é um sistema web de gerenciamento de notas desenvolvido como projeto acadêmico e de estudo, utilizando **Django REST Framework** no backend e **React + Vite** no frontend.

Mais do que um simples CRUD de notas, o projeto está sendo construído para oferecer uma experiência moderna de organização pessoal, inspirada em aplicações como **Google Keep**, porém com funcionalidades próprias, como notas em formato de texto, checklists inteligentes, reorganização de tarefas e futuras integrações.

---

# Objetivos do Projeto

O Memorii busca aplicar, em um único projeto, conceitos modernos de desenvolvimento Full Stack, incluindo:

- Arquitetura Front-end baseada em componentes
- Desenvolvimento de APIs REST
- Autenticação JWT
- Hooks personalizados no React
- Organização escalável do código
- Modelagem de banco de dados
- Boas práticas de Git e GitHub
- Preparação para deploy em produção

---

# Tecnologias Utilizadas

## Backend

- Python 3
- Django
- Django REST Framework
- Simple JWT
- SQLite (desenvolvimento)
- django-cors-headers

## Frontend

- React 19
- Vite
- Axios
- React Router DOM
- React Hooks

## Controle de versão

- Git
- GitHub

---

# Funcionalidades Implementadas

## Sistema de autenticação

- Cadastro de usuários
- Login utilizando JWT
- Access Token
- Refresh Token
- Rotas protegidas
- Perfil autenticado
- Logout
- Login automático enquanto o token existir

---

## Sistema de notas

### Notas de texto

- Criar
- Editar
- Excluir
- Listar

### Notas Checklist

- Criação de checklist
- Criação dinâmica de tarefas
- Armazenamento individual de cada tarefa
- Associação das tarefas à nota
- Estrutura preparada para marcação de tarefas concluídas

---

## Organização dos dados

- Cada usuário possui acesso apenas às próprias notas.
- Relação entre usuários e notas.
- Relação entre notas e itens de checklist.
- Estrutura preparada para fixação de notas.

---

## Frontend

- React Router
- Protected Routes
- Dashboard autenticado
- Componentização
- Hooks personalizados
- Grid de notas
- Modal de criação de notas
- Escolha do tipo de nota
- Formulário específico para notas de texto
- Formulário específico para checklists

---

# Estrutura Atual do Projeto

```text
memorii/

├── back/
│
│   ├── core/
│   ├── notes/
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── front/
│
│   ├── src/
│   │
│   ├── components/
│   │
│   │   ├── layout/
│   │   │      Header.jsx
│   │   │
│   │   ├── notes/
│   │   │      ChooseNoteType.jsx
│   │   │      ChecklistNoteForm.jsx
│   │   │      CreateNoteModal.jsx
│   │   │      NoteCard.jsx
│   │   │      NotesGrid.jsx
│   │   │      TextNoteForm.jsx
│   │   │
│   │   └── ui/
│   │          ProtectedRoute.jsx
│   │
│   ├── hooks/
│   │      useAuth.jsx
│   │      useNotes.jsx
│   │
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
├── assets/
├── .gitignore
└── README.md
```

---

# API

## Usuários

### Cadastro

```
POST /api/register/
```

### Login

```
POST /api/token/
```

### Perfil

```
GET /api/profile/
```

---

## Notas

### Listar

```
GET /api/notes/
```

### Criar

```
POST /api/notes/
```

Exemplo (Texto)

```json
{
    "title": "Minha Nota",
    "note_type": "text",
    "content": "Conteúdo",
    "pinned": false
}
```

Exemplo (Checklist)

```json
{
    "title": "Compras",
    "note_type": "checklist",
    "content": "",
    "pinned": false,
    "items": [
        {
            "text": "Leite"
        },
        {
            "text": "Pão"
        }
    ]
}
```

### Atualizar

```
PUT /api/notes/{id}/
```

### Excluir

```
DELETE /api/notes/{id}/
```

---

# Segurança

- JWT Authentication
- Endpoints protegidos
- Isolamento de dados por usuário
- Proteção das rotas do frontend
- Tokens enviados via Authorization Header

---

# Arquitetura

O projeto segue uma arquitetura baseada em componentes reutilizáveis.

No frontend:

- Layout Components
- UI Components
- Components específicos de Notes
- Hooks personalizados
- Services responsáveis pela comunicação com a API

No backend:

- Models
- Serializers
- Views
- URLs
- API REST

---

# Próximas Implementações

## Checklists

- Exibir tarefas na nota
- Marcar tarefas como concluídas
- Riscar tarefas concluídas
- Reordenação das tarefas
- Inserção de novas tarefas
- Exclusão de tarefas

## Organização

- Fixar notas
- Drag and Drop entre notas
- Drag and Drop entre tarefas
- Ordenação automática

## Interface

- Implementação completa do layout
- Tema moderno inspirado no mockup
- Responsividade
- Animações
- Dark Theme

## Backend

- Refresh Token automático
- PostgreSQL
- Deploy
- Upload de imagens
- Compartilhamento de notas (planejamento futuro)

---

# Status do Projeto

## ✅ Concluído

- Sistema de autenticação
- CRUD completo de notas
- CRUD preparado para checklist
- Arquitetura por componentes
- Hooks personalizados
- Modal de criação
- Dois tipos de nota
- API REST funcional

---

## 🚧 Em desenvolvimento

- Renderização de checklists
- Interface final
- Organização visual das notas
- Drag and Drop
- Sistema de tarefas concluídas

---

# Autor

**Pedro Benetti**

Estudante de Desenvolvimento de Software Multiplataforma — FATEC Itaquera.

O Memorii é um projeto desenvolvido com foco no aprendizado de desenvolvimento Full Stack moderno utilizando Django REST Framework e React, aplicando conceitos de arquitetura de software, boas práticas de programação e desenvolvimento de aplicações escaláveis.