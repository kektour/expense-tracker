'use strict';

const mongoose = require('mongoose');
const { getEnvVar } = require('./helpers/env');

async function connectDB() {
  try {
    const connection = await mongoose.connect(getEnvVar('MONGO_URI'), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected on ${connection.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
}

module.exports = connectDB;
