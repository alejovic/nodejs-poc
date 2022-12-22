# Crud nodejs, express and pg!

# Project Structure
src
   ├──server.js
   ├──.env           dotenv configuration
   ├──app
         ├── index.js			         app entry point
         ├── /api-routes               api routes
         ├── /config			            config settings, env variables
               ├──config.js            convict configuration
               ├──development.json     development configuration values               
         ├── /controllers	            controller layer
         ├── /loaders			         loaders for startup modules
         ├── /services		            service layer: business logic
         ├── /models			            data access layer: database models	
         ├── /scripts		            miscellaneous NPM scripts
         ├── /subscribers		         async event handlers
         └── /test                     test suites



#  framework that provides a robust set of features for web and mobile applications.
npm install --save express 

# for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body.
npm install --save body-parser

# for connecting to Postgresql
npm install --save pg

# UUID
npm install --save uuid


------------

# Example take from dotenv documentation
# install dotenv
npm install --save  dotenv

# server.js
# it automatically loads the environment variables defined in .env
require('dotenv').config() 
# .env
NODE_ENV=dev
DB_HOST=localhost

----------

# Example take from convict documentation
# install convict
npm install convict
# config.js
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
# server.js
const config = require('./config.js');
console.log(config.get('db.host')) // server1.dev.test