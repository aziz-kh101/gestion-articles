# Gestion Articles

## installation migration

```shell
$ cd knex-migration
$ npm i
$ npx knex migrate:latest
$ npx knex seed:run
```

## add .env file

```shell
$ cd shared
$ touch .env

// copy this config inside it

SESSION_SECRET=9f3f2cea26ccd91a343edd63d87200e3ef71d4438619a3b3c67d094dbfa70c03
DATABASE_USER=<database-user-name>
DATABASE_USER_PASSWORD=<database-user-password>
DATABASE_NAME=<database-name> // db must be created first
```

## run back-office

```shell
$ cd back-office
$ npm i
$ npm start
```

> then open this [link](localhost:3000)

## run front-office

```shell
$ cd front-office
$ npm i
$ npm start
```

> then open this [link](localhost:3001)
