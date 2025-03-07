# CRUD 
The project is simple CRUD application.


## Built With

[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#)
[![Jasmine](https://img.shields.io/badge/Jasmine-8A4182?logo=jasmine&logoColor=fff)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
## Features
**All functionality **

- This project was generated with [Angular 19](https://angular.dev)
- [Ngrx/Signalstore](https://ngrx.io/guide/store) 
- Styling with  [Angular Material](https://material.angular.io) based on SCSS
- Testing (TDD, BDD) with Jasmin + Karma
- MicroFrontend ModuleFederation
- Validations
    - The valid mobile number only (You can use Google LibPhoneNumber to validate mobile number).
    - A Valid email and a valid account number must be checked before submitting the form.
    - Create a Browser local storage as a database to store the list of customers.
    - Customers must be unique in the local storage: By Firstname, Lastname and DateOfBirth.
    - Email must be unique in the local storage or memory array.
- Structure
    - Local Storage -> Customer Service -> Single Store -> Use in components and other section.
    - shell project -> Redirect to customer project -> customer component -> Show table and add dialog and form fields with all validations for save of customers -> edit or remove of cutomers.
    

## Development server
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

