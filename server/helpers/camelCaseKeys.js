const camelCase = require('lodash/camelCase');

module.exports = ( obj ) => {
  const copy = { ...obj };
  const result = {};
  Object.keys(copy).forEach(key => {
    result[camelCase(key)] = obj[key];
  });
  return result;
}