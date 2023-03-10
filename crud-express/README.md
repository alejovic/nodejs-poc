# Crud nodejs, express + pg + mongo

## Tools

1. nvm --version 0.39.3
2. node --version v16.19.0
3. IntelliJ
4. docker + postgres
5. docker + mongodb
6. docker + solr

## Frameworks and Libraries

1. express
2. winston, bunyan, morgan
3. joi
4. mocha, jset, jasmine
5. passport
6. swagger

## Project Structure

```text
src
   ├──server.js
   ├──.env           dotenv configuration
   ├──app
         ├── index.js                   app entry point
         ├── /api-docs                  api documnentation (swagger/openApi)
         ├── /api-routes                api routes         
         ├── /config                    config settings, env variables
               ├──config.js             convict configuration
               ├──development.json      development configuration values         
         ├── /controllers               controller layer
         ├── /loaders                   loaders for startup modules
         ├── /services                  service layer: business logic
         ├── /models                    data access layer: database models
         ├── /scripts                   miscellaneous NPM scripts
         ├── /subscribers               async event handlers
         └── /test                      test suites


```

## Nodemon
monitor for any changes in your source and automatically restart your server. Perfect for development.
```shell
npm install --save-dev nodemon
```

## framework that provides a robust set of features for web and mobile applications.

```shell
npm install --save express
```

## for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body.

```shell
npm install --save body-parser
```

## CORS

cors provides Express middleware to enable CORS with various options.

```shell
npm install --save cors
```

**index.js**

* create an Express app, then add body-parser (json, urlencoded) and cors middlewares using app.use() method. Notice that we set origin: http://localhost:8081.
* define a GET route which is simple for test.
* listen on port 8080 for incoming requests.

```javascript
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

```
Now let’s run the app with command: node server.js.
Open your browser with url http://localhost:8080/

## for connecting to Postgresql

### Database

```shell
npm install --save pg
```

### ORM

#### Prisma

#### Sequelize

*pg for PostgreSQL and pg-hstore for converting data into the PostgreSQL hstore format.

```shell
npm install --save pg pg-hstore
npm install --save sequelize
```

#### TypeORM

## UUID

```shell
npm install --save uuid
```

## for connecting to Mongo

### ODM - mongoose

```shell
npm install --save mongoose
```

```shell
$ docker volume create --name mongodata --opt type=none --opt device=/mnt/data/workspace/DB/mongo/mongodata --opt o=bind

$ docker run -p 57017:27017 --name mongo-db --hostname mongo-db \
-v mongodata:/data/db \
-d mongo:latest

$ docker exec -it mongo-db bash
>> mongosh
>> use admin
>> use nodejs
>> db.createUser({ user: "nodejs", pwd: "password", roles: [ { role: "readWrite", db: "nodejs" }] })
{ ok: 1 }
```

```text
JDBC --> mongodb://localhost:27017/nodejs
     --> https://github.com/DataGrip/mongo-jdbc-driver/releases/download/v1.17/mongo-jdbc-standalone-1.17.jar
```

---

## Example taken from dotenv documentation

### install dotenv

```shell
npm install --save  dotenv
```

### server.js

it automatically loads the environment variables defined in .env

```javascript
require('dotenv').config();
```

### .env

```text
NODE_ENV=dev
DB_HOST=localhost

```

---

## Example taken from convict documentation

### install convict

```shell
npm install convict
```

### config.js

```javascript
const convict = require('convict');
// Define schema
var config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    db: {
        host: {
            doc: "Database host name/IP",
            format: '*',
            default: 'server1.dev.test'
        },
        name: {
            doc: "Database name",
            format: String,
            default: 'users'
        }
    }
});
// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({allowed: 'strict'});
module.exports = config;
```

### server.js

```javascript
const config = require('./config.js');
console.log(config.get('db.host')) // server1.dev.test

```

---

## Loggers

Winston
One of the most popular logging library tools. This is my typical logger of choice. It is compact and offers everything you might need from a logger, including levels (sorting messages by importance), formatting (concerning structure and syntax of log entries), different transports (storage for logs), and so on. It is also highly configurable.

Pino
This one offers very similar functionality to Winston. It boasts very little overhead and provides transports as well as log processing. It also offers a pretty-pino module for formating logs during development using NDJSON (Newline Delimited JSON).

Bunyan
It is a simple and fast JSON logging library. It comes with a CLI tool for browsing and pretty-printing logs. It offers custom log rendering with serializers, and logger specialization with log.child. In addition, it streams for specifying log targets.

Log HTTP requests in Node with Morgan
Another best practice is to log your HTTP request in your Node.js application. One of the most used tools to accomplish this is Morgan, which gets the server logs and systematizes them to make them more readable.

### install winston pino morgan bunyan

```shell
npm install --save winston pino morgan bunyan
```

---

## Validations

https://github.com/hapijs/joi/blob/v14.3.1/API.md

### install joi

```shell
npm install --save joi
```
---

## Swagger

```shell
npm install --save swagger-jsdoc swagger-ui-express
```