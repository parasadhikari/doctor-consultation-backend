# Doctor Consultation Backend API

## Overview

A RESTful backend API for a Doctor Consultation Platform built using Node.js, Express.js, Prisma ORM, and MySQL.

The application supports authentication, doctor management, consultations, and messaging between doctors and patients.

---

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- MySQL
- JWT Authentication
- bcrypt
- Swagger UI

---

## Features

### Authentication
- User Registration
- Login
- JWT Authentication
- Protected Routes

### Doctor Module
- View all doctors
- View doctor details

### Consultation Module
- Create consultation
- View consultations
- Update consultation status

### Messaging
- Patient and doctor can exchange messages
- Messages allowed only for ACTIVE consultations

---

## Installation

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/doctor_consultation"
JWT_SECRET=your_secret_key
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Start server

```bash
npm run dev
```

---

## API Endpoints

### Authentication

POST `/api/auth/register`

POST `/api/auth/login`

GET `/api/auth/profile`

---

### Doctors

GET `/api/doctors`

GET `/api/doctors/:id`

---

### Consultations

POST `/api/consultations`

GET `/api/consultations`

GET `/api/consultations/:id`

PATCH `/api/consultations/:id/status`

---

### Messages

POST `/api/consultations/:id/messages`

GET `/api/consultations/:id/messages`

---

## Swagger

```
http://localhost:5000/api-docs
```

---

## Project Structure

```
src/
 ├── config
 ├── controllers
 ├── middleware
 ├── routes
 ├── services
 ├── validators
 ├── utils
 ├── app.js
 └── server.js
```

---

## Author

Paras Adhikari