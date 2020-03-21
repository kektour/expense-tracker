'use strict';

const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { getEnvVar } = require('./helpers/env');
const connectDB = require('./db');

dotenv.config({ path: './config.env' });
connectDB();

const NODE_ENV = getEnvVar('NODE_ENV');
const PORT = getEnvVar('PORT');

const transactions = require('./routes/transactions');

const app = express();
app.use(express.json());
if (NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}
app.use('/v1/api/transactions', transactions);

if (NODE_ENV === 'prod') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
