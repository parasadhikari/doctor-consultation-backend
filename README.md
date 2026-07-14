# 🩺 Doctor Consultation Backend API

A RESTful backend API for a simple Doctor–Patient Consultation Platform built using **Node.js**, **Express.js**, **Prisma ORM**, **MySQL**, and **JWT Authentication**.

This project was developed as part of a **Backend Engineer Intern Assignment**.

---

# Features

### Authentication
- Patient & Doctor Registration
- JWT Login Authentication
- Password Hashing using bcrypt
- Protected Routes
- Get Logged-in User Profile

### Doctors
- View all available doctors
- View doctor details by ID

### Consultation
- Patient can create consultation
- Doctor can update consultation status
- Consultation Status:
  - Pending
  - Active
  - Completed

### Chat
- Patient and doctor can exchange messages
- Messages returned in chronological order
- Completed consultations cannot receive new messages

### Validation & Security
- JWT Authentication
- Password Hashing
- Duplicate Email Validation
- Invalid Consultation Validation
- Authorization Checks
- Error Handling
- Secure HTTP Headers using Helmet

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- Prisma ORM
- JWT Authentication
- bcrypt
- Express Validator
- Swagger UI
- Postman

---

# Project Structure

```
src/
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
├── utils/
├── validators/
├── app.js
└── server.js

prisma/
├── schema.prisma
└── migrations/
```

---

# Database Schema

## User

| Field | Type |
|--------|------|
| id | Integer |
| name | String |
| email | String |
| password | String |
| role | PATIENT / DOCTOR |

---

## DoctorProfile

| Field | Type |
|--------|------|
| id | Integer |
| specialization | String |
| experience | Integer |
| userId | Integer |

---

## Consultation

| Field | Type |
|--------|------|
| id | Integer |
| patientId | Integer |
| doctorId | Integer |
| status | Pending / Active / Completed |
| createdAt | DateTime |

---

## Message

| Field | Type |
|--------|------|
| id | Integer |
| consultationId | Integer |
| senderId | Integer |
| message | Text |
| createdAt | DateTime |

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Profile

```
GET /api/auth/profile
```

Requires JWT Token.

---

## Doctors

### Get All Doctors

```
GET /api/doctors
```

### Get Doctor By ID

```
GET /api/doctors/:id
```

---

## Consultations

### Create Consultation

```
POST /api/consultations
```

Only Patient can create.

---

### Get All Consultations

```
GET /api/consultations
```

Returns consultations for logged-in user.

---

### Get Consultation By ID

```
GET /api/consultations/:id
```

---

### Update Consultation Status

```
PATCH /api/consultations/:id/status
```

Only assigned Doctor can update.

Allowed Status:

- ACTIVE
- COMPLETED

---

## Messages

### Send Message

```
POST /api/consultations/:id/messages
```

Only Patient and assigned Doctor can send messages.

---

### Get Messages

```
GET /api/consultations/:id/messages
```

Messages are returned in chronological order.

---

# Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/doctor-consultation-backend.git
```

Go to project directory

```bash
cd doctor-consultation-backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```
PORT=5000

DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/doctor_consultation"

JWT_SECRET=your_secret_key
```

---

# Prisma Commands

Generate Prisma Client

```bash
npx prisma generate
```

Run Database Migration

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# Run Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# Business Rules Implemented

- Passwords are securely hashed.
- JWT Authentication protects private routes.
- Only Patients can create consultations.
- Only assigned Doctors can change consultation status.
- Completed consultations cannot be modified.
- Only assigned Doctor and Patient can exchange messages.
- Messages are returned in chronological order.
- Duplicate email registration is prevented.
- Unauthorized users cannot access protected resources.

---

# Error Handling

The application returns meaningful HTTP status codes including:

- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error

---

# Testing

The APIs were tested using:

- Postman
- Prisma Studio
- MySQL

---

# Assumptions

- A consultation is created with `PENDING` status.
- Only the assigned doctor can change consultation status.
- Consultation must be `ACTIVE` before messages can be exchanged.
- Once marked `COMPLETED`, no further updates or messages are allowed.
- Each doctor has one doctor profile.

---

# Future Improvements

- Real-time chat using Socket.io
- Pagination
- File Uploads
- Appointment Scheduling
- Notifications
- Docker Support
- Complete Swagger Documentation

---

# Author

**Paras Adhikari**

GitHub: https://github.com/parasadhikari

LinkedIn: https://www.linkedin.com/in/paras-adhikari-a10151247/

---