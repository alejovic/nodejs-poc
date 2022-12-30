# Crud nodejs, express + pg + mongo

## Tools
1. nvm --version 0.39.3
2. node --version v16.19.0
3. IntelliJ
4. docker + postgres
5. docker + mongodb
6. docker + solr

## Frameworks
1. express
2. winston, bunyan, morgan
3. joi
4. mocha, jset, jasmine
5. passport

## Project Structure
```text
src
   ├──server.js
   ├──.env           dotenv configuration
   ├──app
         ├── index.js                   app entry point
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

## framework that provides a robust set of features for web and mobile applications.
```shell
npm install --save express
```

## for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body.
```shell
npm install --save body-parser
```

## for connecting to Postgresql
```shell
npm install --save pg
```

## UUID
```shell
npm install --save uuid
```

## for connecting to Mongo
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
