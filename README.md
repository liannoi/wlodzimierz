<img align="left" width="116" height="116" src="https://github.com/liannoi/wlodzimierz/blob/main/img/favicon.ico"/>

# WLODZIMIERZ

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/21ec38ca8a924fce8b34be1398042f0c)](https://app.codacy.com/gh/liannoi/wlodzimierz?utm_source=github.com&utm_medium=referral&utm_content=liannoi/wlodzimierz&utm_campaign=Badge_Grade)
[![Code Climate](https://api.codeclimate.com/v1/badges/d20791e6eae10de3149c/maintainability)](https://codeclimate.com/github/liannoi/wlodzimierz/maintainability)
[![CodeFactor](https://www.codefactor.io/repository/github/liannoi/wlodzimierz/badge)](https://www.codefactor.io/repository/github/liannoi/wlodzimierz)
[![Codebeat](https://codebeat.co/badges/9fb05993-a47e-49f1-8a70-656cb9ddaa57)](https://codebeat.co/projects/github-com-liannoi-wlodzimierz-main)
[![BetterCode](https://bettercodehub.com/edge/badge/liannoi/wlodzimierz?branch=main)](https://bettercodehub.com/)

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

## GitHub Actions - Build Status

| Type          | Status                                                                                                 |
|---------------|--------------------------------------------------------------------------------------------------------|
| Classic (CLI) | ![.NET 5 - Classic](https://github.com/liannoi/wlodzimierz/workflows/.NET%205%20-%20Classic/badge.svg) |
| Docker        | ![.NET 5 - Docker](https://github.com/liannoi/wlodzimierz/workflows/.NET%205%20-%20Docker/badge.svg)   |

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

- .NET 5
- Docker 19.03
- Microsoft SQL Server 2019
- Entity Framework Core 5
- ASP.NET Core Identity 5
- MediatR 9
- AutoMapper 10.1
- FluentValidation 9.3
- Swagger
- LinqKit 1.1
- FluentAssertions 5.10
- Moq 4.15
- NUnit
- Respawn 3.3
- SignalR

### Documentation

For more detailed information about the project - go to the [Wiki](https://github.com/liannoi/wlodzimierz/wiki) section.

## License

This repository is licensed under
[Apache-2.0](https://github.com/liannoi/wlodzimierz/blob/main/LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fliannoi%2Fwlodzimierz.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fliannoi%2Fwlodzimierz?ref=badge_large)

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
