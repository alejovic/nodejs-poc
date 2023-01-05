const basicInfo = require('./api.basic.info');
const servers = require('./api.server.info');
const schemas = require('./api.schemas.info');
const tags = require('./api.tags.info');
const methods = require('./methods');

module.exports = {
    ...basicInfo,
    ...servers,
    ...schemas,
    ...tags,
    ...methods,
};
