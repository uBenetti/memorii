<a href="README-PT.md">
  <img src="Assets/EN-us.png" alt="American English" width="120">
</a>

<p align="center">
  <img src="assets/icon.svg" alt="Memorii" width="180">
</p>
<h1 align="center">Memorii</h1>

<p align="center">
  Intelligent system for managing notes and checklists.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Django-6.0-green">
  <img src="https://img.shields.io/badge/Django_REST_Framework-API-red">
  <img src="https://img.shields.io/badge/React-19-blue">
  <img src="https://img.shields.io/badge/Vite-8-purple">
  <img src="https://img.shields.io/badge/JWT-Authentication-orange">
  <img src="https://img.shields.io/badge/Status-In_Development-yellow">
</p>

---

# Memorii

**Memorii** is a web-based note management system developed as an academic and learning project, utilizing **Django REST Framework** for the backend and **React + Vite** for the frontend.

The project is being built with a focus on a modern personal organization experience; it is inspired by applications like **Google Keep** but features a custom architecture designed to support future functionality.

Currently, the system supports the management of text notes and checklists, featuring JWT-based authentication and data isolation between users.

---

# Project Objectives

Memorii aims to apply modern Full Stack development concepts within a single project, including:

- REST API development
- JWT-based authentication
- UI development with React
- Component-based architecture
- Creation of custom hooks
- Separation of concerns
- Database modeling
- Entity relationships
- Frontend state management
- Git and GitHub best practices
- Development in local environments and GitHub Codespaces
- Preparation for production deployment
- Building a scalable architecture

---

# Technologies Used

## Backend

- Python 3
- Django 6
- Django REST Framework
- Simple JWT
- SQLite (development)
- django-cors-headers

## Frontend

- React 19
- Vite 8
- Axios
- React Router DOM
- React Hooks

## Version controler

- Git
- GitHub
- GitHub Codespaces

---

# Implemented Features

## Authentication System

The system uses **JSON Web Token (JWT)**-based authentication.

Currently, the authentication flow includes:

- User registration
- Login using JWT
- Access Token generation
- Refresh Token generation
- Access Token storage in Local Storage
- Frontend route protection
- Authenticated profile verification
- Token validation via the API
- Session persistence after page reload
- Logout
- Removal of invalid or expired tokens

---

## Note system

### Text notes

#### Text notes have:
- Title
- Content
- Note type
- Pin status
- Creation date

#### Available operations:
- Create
- List
- Edit
- Delete

### Checklist Notes

#### A checklist consists of:
- Title
- List of tasks
- Completion status for each item
- Task order

---

## Data organization

The system features data isolation by user.
Each note has a responsible user:

```
User
 │
 └── Notes
      │
      ├── Text Note
      │
      └── Checklist Note
            │
            ├── ChecklistItem
            ├── ChecklistItem
            └── ChecklistItem
```

The backend uses the user authenticated via JWT to ensure that each user accesses only their own notes.

---

## Frontend

- React Router
- Protected routes
- Authenticated dashboard
- Componentization
- Custom hooks
- Note grid
- Note creation modal
- Note type selection
- Specific form for text notes
- Specific form for checklists

---

# Current Project Structure

```text
memorii/
│
├── back/
│   │
│   ├── core/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
│   ├── notes/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── migrations/
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── front/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   └── Header.jsx
│   │   │   │
│   │   │   ├── notes/
│   │   │   │   ├── ChooseNoteType.jsx
│   │   │   │   ├── ChecklistNoteForm.jsx
│   │   │   │   ├── CreateNoteModal.jsx
│   │   │   │   ├── EditNoteModal.jsx
│   │   │   │   ├── NoteCard.jsx
│   │   │   │   ├── NotesGrid.jsx
│   │   │   │   └── TextNoteForm.jsx
│   │   │   │
│   │   │   └── ui/
│   │   │       └── ProtectedRoute.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useNotes.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── routers/
│   │   │   └── AppRouters.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── noteService.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── assets/
│   └── icon.svg
│
├── .gitignore
└── README.md
```

---

# API

## Users

### Register

```
POST /api/register/
```

### Login

```
POST /api/token/
```

### Profile

```
GET /api/profile/
```

### Token renewal

```
POST /api/token/refresh/
```

---

## Notes

### List

```
GET /api/notes/
```

### Create

```
POST /api/notes/
```

Example (Text)

```json
{
    "title": "My Note",
    "note_type": "text",
    "content": "note content",
    "pinned": false
}
```

Example (Checklist)

```json
{
    "title": "Shopping List",
    "note_type": "checklist",
    "content": "",
    "pinned": false,
    "items": [
        {
            "text": "Milk",
            "completed": false
        },
        {
            "text": "Bread",
            "completed": false
        }
    ]
}
```

### Update

```
PUT /api/notes/{id}/
```

### Exclude

```
DELETE /api/notes/{id}/
```

---

# Security

- JWT authentication
- Protected endpoints
- Authorization header
- Protected routes in React
- Token validation via API
- Automatic removal of invalid tokens
- Data isolation by user

---

# Architecture

The project follows an architecture based on the separation of concerns.

## Frontend

### Components

Responsible for the visual interface

```text
Header
NoteCard
NotesGrid
CreateNoteModal
EditNoteModal
```

### Hooks

Responsible for reusable logic.

```text
useAuth
useNotes
```

### Services

Responsible for communication with the API.

```text
authService
noteService
```

### Protected Routes

Responsible for preventing access by unauthenticated users.

## Backend

The API uses the traditional Django REST Framework architecture:

```text 
  Models
    ↓
Serializers
    ↓
  Views
    ↓
   URLs
    ↓
   API
```

---

# Development in GitHub Codespaces

The project is also set up for development using GitHub Codespaces.

This configuration allows development to continue on computers with software installation restrictions, such as in school environments.

The Codespace allows you to run:

```text
Backend Django
        +
Frontend React/Vite
```
in a virtualized cloud environment.

This allows you to access the project from different computers without needing to install all the development tools locally.

---

# Upcoming Implementations

## Checklists

- Display tasks directly on the NoteCard
- Mark tasks as completed
- Cross out completed tasks
- Update the status of each task
- Reorder tasks
- Add new tasks while editing
- Delete tasks individually

## Organization

- Pin notes
- Filter pinned notes
- Note search
- Drag and drop between notes
- Drag and drop between tasks
- Automatic sorting
- Organization by category

## Interface

- Full implementation of the visual layout
- Modern interface inspired by the initial Memorii concept
- Responsiveness
- Animations
- Dark Theme
- Modal improvements
- Visual feedback for actions
- Empty states
- Error states

## Authentication

- Automatic Access Token renewal using the Refresh Token
- Session expiration
- Improved global authentication management
- Centralization of authentication state via Context API

## Backend

- Migration from SQLite to PostgreSQL
- Backend deployment
- Image upload
- Attachments
- Note sharing
- Permissions system
- Data validation improvements

---

# Project Status

## ✅ Completed

- Initial project structure
- Django backend
- REST API
- User registration
- JWT login
- Access token
- Refresh token
- Authenticated profile
- Protected routes
- Logout
- Token validation
- Authentication persistence
- Removal of invalid tokens
- Note CRUD
- Text notes
- Checklist structure
- Checklist items
- Association between notes and tasks
- Data isolation by user
- Custom hooks
- useAuth
- useNotes
- API services
- Authenticated dashboard
- Notes grid
- Note cards
- Creation modal
- Note type selection
- Text note form
- Checklist form
- Standalone edit modal
- Note deletion
- Note loading state
- Separation of note creation and editing
- Development setup via GitHub Codespaces
- Marking tasks as complete
- Visual organization of notes
- Empty states
- Automatic JWT renewal


---

## Under development:

- Full visual rendering of checklists
- Final interface
- Error states
- Note pinning system
- Drag-and-drop
- Search system
- Dark theme
- Responsiveness

---

# Author

**Pedro Benetti**

Multiplatform Software Development student — FATEC Itaquera.

Memorii is a project developed with a focus on hands-on learning of modern Full Stack development using Django REST Framework and React.

The project applies concepts such as:
- REST API development
- Authentication and security
- Software architecture
- Componentization
- State management
- Data modeling
- Git and GitHub best practices
- Scalable application development

---

# Current Status

## 🚧 Under active development. 🚧

The project continues to evolve steadily, focusing on building a comprehensive personal organization application based on notes, checklists, and future productivity features.
