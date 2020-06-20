const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./src/config');
const routes = require('./src/routes');
const db = require('./src/models');

const isProd = config.nodeEnv === 'production';

async function bootstarp() {
  const server = express();

  server.use(cors());
  server.use(bodyParser.json());
  server.use(morgan(isProd ? 'common' : 'dev'));
  routes.init(server);

  await db.init();

  const PORT = config.port;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

bootstarp();
