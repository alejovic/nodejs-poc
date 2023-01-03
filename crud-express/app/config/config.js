const convict = require('convict');

// no best practice but can be run along witj convict!!
// const dotenv = require('dotenv');
// dotenv.config();

// Define schema
// Note the env values are take from env.
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: '*',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT'
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: '127.0.0.1',
      env: 'DB_HOST'
    },
    port: {
      doc: 'Database Port',
      format: 'port',
      default: 5432,
      env: 'DB_PORT'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: '',
      env: 'DB_DATABASE'
    },
    user: {
      doc: 'Database User',
      format: String,
      default: '',
      env: 'DB_USER'
    },
    password: {
      doc: 'Database Password',
      format: String,
      default: '',
      env: 'DB_PASSWORD'
    }
  },
  nosql: {
    mongo_uri: {
      doc: 'Mongo URI',
      format: String,
      default: '',
      env: 'MONGODB_URI'
    }
  }
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(`./app/config/${env}.json`);


// Perform validation
config.validate({ allowed: 'strict' });
module.exports = config;
module.exports.env = env;
