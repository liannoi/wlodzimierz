<img align="left" width="116" height="116" src="https://github.com/liannoi/wlodzimierz/blob/main/img/favicon.ico"/>

# WLODZIMIERZ

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/21ec38ca8a924fce8b34be1398042f0c)](https://app.codacy.com/gh/liannoi/wlodzimierz?utm_source=github.com&utm_medium=referral&utm_content=liannoi/wlodzimierz&utm_campaign=Badge_Grade)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

<br/>

The goal of the project is to provide a simple, convenient and cross-platform
messenger for providing textual communication between users.

### Principles, paradigms, practices

This project adheres to the best practices from the entire field of business
application development.

Among them:

- Object Oriented Programming (OOP)
- Object Oriented Design (OOD - SOLID, GRASP)
- GOF design patterns as well as architectural patterns (MVC, MVVM, CQRS)
- Domain-Driven Design (DDD)
- Reactive Programming Paradigm
- Principle of "Clean Architecture"
- Test Driven Development (TDD)

### Architecture

The server-side RESTful Web API is written in .NET Core using the MediatR
library to implement the CQRS design pattern.

The clients are:

- Single-page application (SPA) in Angular
- Native mobile application on Kotlin

## Technologies

> To describe the technologies of this project, it was decided to divide them
> into two conditional categories. The first category **Client** refers to
> technologies that are related to the clients of the project, and the second
> category **Server** refers to technologies that are related to the server-side
> RESTful Web API.

### Client:

- Angular 11
- Bootstrap 4.5 (ng-bootstrap)
- RxJS 6

---

- Kotlin 1.4
- Android Jetpack (Hilt, Android Architecture Components)
- SQLite
- RxJava (RxKotlin, RxAndroid, RxBinding)

### Server:

- .NET Core 3.1
- ASP.NET Core Identity 3.1
- Microsoft SQL Server 2019
- Docker
- Entity Framework Core 3.1
- MediatR
- AutoMapper
- SignalR
- Swagger

## Classes and characteristics of users

| User class      | Description                                                                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Guest**       | Any non-authenticated user of the application.                                                                                                                                    |
| **User**        | Authenticated user an application that is provided with a list of conversations and groups in which he is a member, as well as a list of contacts available for sending messages. |
| **Group Admin** | An authenticated user of the application who is the administrator of a specific group. Initially, the user who created the group is considered its administrator.                 |

## Database diagram

![](https://github.com/liannoi/wlodzimierz/blob/main/database/wlodzimierz-diagram.png)

## License

This repository is licensed under
[Apache-2.0](https://github.com/liannoi/wlodzimierz/blob/main/LICENSE).

```
Copyright 2020 Maksym Liannoi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
