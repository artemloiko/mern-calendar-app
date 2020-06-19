const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./src/config');

async function bootstarp() {
  const app = express();

  var corsOptions = {
    origin: 'http://localhost:3000',
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Hello, to MERN Calendar.' });
  });

  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

bootstarp();
