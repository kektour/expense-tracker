'use strict';

const Transaction = require('../models/Transaction');

exports.getTransactions = async function(req, res, next) {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      data: transactions,
      count: transactions.length
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Server Error'
    });
  }
};

exports.addTransaction = async function(req, res, next) {
  const { text, amount } = req.body;
  try {
    const transaction = await Transaction.create({ text, amount });
    return res.status(201).json({
      data: transaction
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.messages);
      res.status(400).json({
        error: messages
      });
    } else {
      return res.status(500).json({
        error: 'Server Error'
      });
    }
  }
};

exports.deleteTransaction = async function(req, res, next) {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      res.status(404).json({
        error: 'No transaction found'
      });
    }

    await transaction.remove();
    return res.status(200).json({
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Server Error'
    });
  }
};
