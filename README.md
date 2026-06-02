# 🚀 CRUD Test Angular

<p align="center">

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-Store-BA2BD2?logo=redux&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-UI-0081CB?logo=angular&logoColor=white)
![Module Federation](https://img.shields.io/badge/MicroFrontend-Module_Federation-orange)
![Jasmine](https://img.shields.io/badge/Test-Jasmine-8A4182?logo=jasmine&logoColor=white)
![Karma](https://img.shields.io/badge/Test-Karma-56C1B3?logo=karma&logoColor=white)
![ESLint](https://img.shields.io/badge/Lint-ESLint-4B3263?logo=eslint&logoColor=white)

</p>

---

## 📌 Project Overview

This project is a **Customer Management CRUD Application** developed using **Angular 19** with a **Micro Frontend architecture** based on **Module Federation**.

The application allows users to manage customer data (Create, Read, Update, Delete) while applying advanced validation rules and structured state management using **NgRx Signal Store**.

This project demonstrates practical implementation of:

- Component-based architecture
- State management
- Form validation
- Client-side persistence
- Micro Frontend architecture
- Testing and code quality tools

---

## 🎯 Project Objective

The objective of this project is to build a structured and scalable Angular application that:

- Manages customer records
- Applies strict validation rules
- Ensures uniqueness of records
- Stores data using browser Local Storage
- Demonstrates Micro Frontend architecture

The system is entirely front-end focused, with **Local Storage acting as a lightweight database layer**.

---

## 🏗 Architecture

The project is divided into two main applications:

```text
crud-test-angular
├── customer (Remote Micro Frontend)
└── shell (Host Application)
```

### 🔹 Shell
- Acts as the host application
- Handles routing
- Loads the customer micro frontend dynamically

### 🔹 Customer (Remote)
Contains:
- Components
- Pages
- Services
- Store
- Models
- Utilities

---

## 📂 Detailed Structure

```text
customer
├── components
│   ├── customer-form
│   ├── dialog
│   ├── dynamic-dialog
│   └── dynamic-table
├── models
├── pages
│   └── customer
├── services
├── store
└── utils
```

### 📌 Data Flow

```text
Local Storage → Customer Service → NgRx Store → Components
```

This structure ensures:

- Separation of concerns
- Predictable state management
- Maintainable architecture

---

## ✨ Features

✅ Full CRUD functionality  
✅ Micro Frontend using Module Federation  
✅ State management with NgRx Signal Store  
✅ Reusable dynamic table and dialog components  
✅ Angular Material UI (SCSS-based styling)  
✅ Advanced form validation  
✅ Unique customer validation logic  
✅ Local Storage persistence  
✅ Unit testing with Jasmine + Karma  
✅ ESLint & Prettier integration  

---

## ✅ Validation Rules

The system ensures data integrity with:

- ✔ Valid mobile number (using Google LibPhoneNumber)
- ✔ Valid email format
- ✔ Valid account number
- ✔ Unique customer (First Name + Last Name + Date of Birth)
- ✔ Unique email address

These rules prevent invalid or duplicate records from being stored.

---

## 🛠 Technologies Used

| Category | Technology |
|----------|------------|
| Framework | Angular 19 |
| Language | TypeScript |
| UI | Angular Material |
| State Management | NgRx (Store + Signals) |
| Architecture | Module Federation (Micro Frontend) |
| Testing | Jasmine + Karma |
| Linting | ESLint |
| Utilities | Google LibPhoneNumber |
| Styling | SCSS |

---

## ⚙️ Installation & Running

### 🔹 Install dependencies
| Function                   | Description     |
| :------------------------- | :---------------------------------------------------------- |
| `ng serve shell`        | Navigate to `http://localhost:4200/` | 
| `ng serve customer`        | Navigate to `http://localhost:4201/` | 
| `npm run run:all `        | Run two servers of projects Navigate to `http://localhost:4200/` | 
| `ng test` | Running unit tests | 
| `npm run test --project customer` | Running unit tests of customer project | 
| `ng e2e`  | Running end-to-end tests |
| `npm run lint`  | Formatting |
| `ng generate component component-name`        | Code scaffolding | 
| `ng build`| Build | 



## 👨‍💻 Author
Assignment Project for a company (Rayankar) – CRUD Application with Angular Micro Frontend Architecture  


