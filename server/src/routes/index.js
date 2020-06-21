const path = require('path');
const express = require('express');
const apiRoutes = require('./api');

const pathToBuild = path.resolve(__dirname, '../../../client/build');

const init = (server) => {
  server.use('/api', apiRoutes);

  server.use(express.static(pathToBuild));
  // eslint-disable-next-line no-unused-vars
  server.use((err, req, res, next) => {
    if (!err.status || err.status == 500) console.log('[INTERNAL ERROR]', err);
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
      },
    });
  });
};

module.exports = {
  init,
};
