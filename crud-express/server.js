const app = require('./app');
const config = require('./app/config/config.js');
const logger = require('./app/config/logger');

// no best practice
// const dotenv = require('dotenv');
// dotenv.config();
// dotenv
// const port = parseInt(process.env.PORT, 10) || 5000;

// best practice convict
const port = config.get('port') || 5000;

// listen for requests
app.listen(port, () => {
    logger.info(`Server is listening on port at http://localhots:${port}`);
});
