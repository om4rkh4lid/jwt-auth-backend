# JWT Auth Backend

A Registration, Authentication, and Authorization system using Node.js, Express, TypeScript, and TypeORM

The project's frontend: https://github.com/om4rkh4lid/jwt-auth-frontend

## Description

In this project I practiced working with TypeScript in NodeJS (Express) as well as using a Relational ORM (TypeORM) for TypeScript.
I've also implemented a more secure approach using refresh tokens and access tokens to prevent XSS and CSRF attacks.

## Getting Started

### Dependencies

* bcrypt
* cookie-parser
* cors
* dotenv
* express
* joi
* jsonwebtoken
* pg
* typeorm

### Installing

* Download the project files or clone this repository
* Create a .env file at the root of the project with the following variables:
    - NODE_ENV ("production" or "development")
    - DB_HOST
    - DB_PORT
    - DB_USERNAME
    - DB_PASSWORD
    - DB_NAME
    - DEV_DB_NAME
    - HOST
    - PORT
    - SALT_ROUNDS
    - ACCESS_TOKEN_SECRET_KEY
    - ACCESS_TOKEN_EXPIRES_IN
    - REFRESH_TOKEN_SECRET_KEY
    - REFRESH_TOKEN_EXPIRES_IN

### Executing program

* Make sure you have nodejs installed
* run the following command in the project's root directory
* to run the project in development mode run the following command in your terminal
```
npm run dev
```
* to run the project in production mode run the following command in your terminal
```
npm start
```
