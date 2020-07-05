# React Auth

We're developing a SPA with authentication from scratch.

## Table of contents

- [Getting Started](#getting-started)
- [Docker](#docker)
  - [What is a service?](#what-is-a-service)
  - [Starting the development environment](#starting-the-development-environment)
  - [Stopping the development environment](#stopping-the-development-environment)
  - [Restarting a service](#starting-a-service)
  - [Viewing logs](#viewing-logs)
  - [SSH into a service](#ssh-into-a-service)
- [Database](#database)
  - [Scripts](#scripts)

## Getting started

This project has three dependencies:

1. Clone this repo
2. Install [Docker](https://docs.docker.com/get-docker/)
3. [Node](https://nodejs.org/en/download/) (which includes `npm`)

Run `npm start` from the root of the project to start the docker services. That command will then run `docker-compose up` after first running `docker-compose down`. Press `CTRL + C` to kill that process. However, even after killing the process, the docker services will still be running. See [stopping the development environment](#stopping-the-development-environment) to shut those containers down.

After running `npm start`, you should be able to access [http://localhost](http://localhost).

Notes:

- the first time you run this command, Docker will have to download the image dependencies, so it may take a couple of minutes
- subsequent runs should take around 30 seconds
- while the development environment is running, you're able to change client related code and see the changes reflected in the browser
- when editing webpack config, you'll need to [restart the client service](#starting-a-service)
- when editing the api server, you'll need to [restart the api service](#starting-a-service)
- when editing `docker-compose.yml`, you'll need to re-run `npm start`

## Docker

### What is a "service"?

Services are defined in `docker-compose.yml`.

```yml
version: "3.8"
services:
  client: ...
  api: ...
  db: ...
```

We have three services defined: `client`, `api` and `db`.

### Starting the development environment

Run `docker-compose up` from the project root. This will run each service defined in `docker-compose.yml`.

Tips

- `docker-compose up -d` will run a background process
- `docker ps -a` will list all containers and their status
- learn more about [docker-compose](https://docs.docker.com/compose/)

### Stopping the development environment

Run `docker-compose down` from the project root. This will tear down all services defined in `docker-compose.yml`.

Tips:

- `docker-compose down --remove-orphans` will remove containers for services not defined in `docker-compose.yml`

### Restaring a service

Run `docker-compose restart [service]` from the project root. This is helpful for things like restarting a Node server.

### Viewing logs

Run `docker-compose logs` from the project root to see logs for all services. This is helpful when debugging.

### SSH into a service

Run `docker-compose exec [service] bash` from the project root. This will connect you to a running service via SSH.

Tips:

- Remember that each container is ephemeral; whatever changes you make won't be persisted after running `docker-compose down`
- You may notice that packages you would normally expect in a linux environment are missing; feel free to install anything you need via `apt-get`

## Database

To SSH into the database, run `docker-compose exec db bash` (see [SSH into a service](#ssh-into-a-service)).

### Scripts

The `package.json` file located at the root of the project has some helpful database scripts.

- `npm run db:recreate` will first drop and then recreate all database tables
- `npm run db:populate` will populate the database tables with dummy data
- `npm run db:selectUsers` will query the database for all registered users

The coresponding SQL files that are executed can be found in `/db`.
