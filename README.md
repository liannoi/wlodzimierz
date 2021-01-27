<img align="left" width="116" height="116" src="https://github.com/liannoi/wlodzimierz/blob/main/img/favicon.ico"/>

# WLODZIMIERZ

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/21ec38ca8a924fce8b34be1398042f0c)](https://app.codacy.com/gh/liannoi/wlodzimierz?utm_source=github.com&utm_medium=referral&utm_content=liannoi/wlodzimierz&utm_campaign=Badge_Grade)
[![Code Climate](https://api.codeclimate.com/v1/badges/d20791e6eae10de3149c/maintainability)](https://codeclimate.com/github/liannoi/wlodzimierz/maintainability)
[![CodeFactor](https://www.codefactor.io/repository/github/liannoi/wlodzimierz/badge)](https://www.codefactor.io/repository/github/liannoi/wlodzimierz)
[![Codebeat](https://codebeat.co/badges/9fb05993-a47e-49f1-8a70-656cb9ddaa57)](https://codebeat.co/projects/github-com-liannoi-wlodzimierz-main)
[![BetterCode](https://bettercodehub.com/edge/badge/liannoi/wlodzimierz?branch=main)](https://bettercodehub.com/)

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

The server-side RESTful Web API is written in .NET Core using MediatR library
to implement CQRS design pattern.

The clients are:

- Single-page application (SPA) in Angular
- Native mobile application on Kotlin

## Technologies

> To describe the technologies of this project, it was decided to divide them
> into two conditional categories. The first category **External clients**
> refers to technologies that are related to the clients of the project, and
> the second category **Server** refers to technologies that are related to the
> server-side RESTful Web API.

### External clients

#### SPA web app

- Angular 11.1
- Sass
- [Nx](https://nx.dev/)
- Bootstrap 4.6 (ng-bootstrap)
- RxJS 6.6

#### Native mobile app

- Kotlin 1.4
- Android Jetpack (Hilt, Android Architecture Components)
- SQLite
- RxJava (RxKotlin, RxAndroid, RxBinding)

### Server

- .NET 5
- Docker 19.03
- Microsoft SQL Server 2019
- Entity Framework Core 5
- ASP.NET Core Identity 5
- MediatR 9
- AutoMapper 10.1
- FluentValidation 9.3
- Swagger
- FluentAssertions 5.10
- Moq 4.15
- NUnit
- Respawn 3.3
- LinqKit 1.1
- Redis 6
- Serilog 2.10
- Seq 2020.1
- SignalR

## Getting Started

To begin with, I would like to note that the project, or rather server RESTful
Web API, can be deployed in two options:

- Classic (using [.NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools) and / or Windows operating system).
- Deploying Docker containers in a composition via Docker Compose.

In any case the requirements will be the same, except for the ways of
interacting with tools, depending on the chosen strategy.

### Prerequisites

Thus, you will need the following tools:

- [.NET 5 SDK](https://dotnet.microsoft.com/download) (will include .NET CLI)
- [JetBrains Rider](https://www.jetbrains.com/rider/download) or [Visual Studio](https://visualstudio.microsoft.com/downloads)
- [JetBrains DataGrip](https://www.jetbrains.com/datagrip/download) or [SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
- [JetBrains WebStorm](https://www.jetbrains.com/webstorm/download) or [Visual Studio Code](https://code.visualstudio.com/download)
- [GitHub CLI](https://cli.github.com) (optional)

---

- [Docker Engine](https://docs.docker.com/get-docker)
- [Docker Compose](https://docs.docker.com/compose/install)

### Classic

![.NET 5 - Classic build](https://github.com/liannoi/wlodzimierz/workflows/.NET%205%20-%20Classic%20build/badge.svg)

> There are no instructions due to technical limitations (during development, a
> strategy with Docker is used on macOS Big Sur operating system).

### Docker

![.NET 5 - Deployment in Docker](https://github.com/liannoi/wlodzimierz/workflows/.NET%205%20-%20Deployment%20in%20Docker/badge.svg)

Use the following instructions to deploy in Docker containers as composition
using Docker Compose.

1. Clone the repository.

```
gh repo clone liannoi/wlodzimierz
```

2. Go to the root directory of the project and then to the directory with the source code.

```
cd wlodzimierz/src
```

3. Start the Docker service (for macOS only ```Docker Desktop``` application needs to be started).

---

4. Download the images necessary for the composition from Docker Registry, on the basis of which Docker Compose will build the container composition.

```
docker-compose pull
```

5. Build Web API container from the described Dockerfile.

```
docker-compose build
```

6. Deploying a Docker composition.

```
docker-compose up -d
```

---

Or just run the simplified command to deploy the composition.

```
docker-compose pull && docker-compose build && docker-compose up -d
```

---

7. Launch [```https://localhost:5001/api```](https://localhost:5001/api) in your browser and you will see Swagger generated RESTful API documentation.

8. Next, within the ```/src/Clients/web-spa``` directory, install all application dependencies locally and launch the frontend.

```
npm install && npm run start-nx
```

## Specification

For more specific information about the project - go to [Wiki](https://github.com/liannoi/wlodzimierz/wiki) section.

## License

This repository is licensed under
[Apache-2.0](https://github.com/liannoi/wlodzimierz/blob/main/LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fliannoi%2Fwlodzimierz.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fliannoi%2Fwlodzimierz?ref=badge_large)

```
Copyright 2020-2021 Maksym Liannoi

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
