/* global require module */

const context = require.context('./tests', true, /\.test\.jsx?$/);

context.keys().forEach(context);

module.exports = context;
