const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'plotly.js/dist/plotly': path.resolve(
      __dirname,
      'node_modules/plotly.js/dist/plotly.js'
    )
  })
);