const path = require('path');
const express = require('express');
const apiRoutes = require('./api');
const jwtAuth = require('../middlewares/jwtAuth');

const pathToBuild = path.resolve(__dirname, '../../../client/build');

const init = (server) => {
  server.use('/api', apiRoutes);

  server.get('/api/events', jwtAuth, (req, res) => {
    console.log('req', req.userId);
    res.json({ events: [] });
  });

  server.use(express.static(pathToBuild));
  // eslint-disable-next-line no-unused-vars
  server.use((err, req, res, next) => {
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
