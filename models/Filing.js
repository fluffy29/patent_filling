const mongoose = require('mongoose');

const filingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  },
  audience: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  claims: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'reviewing', 'approved'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Filing', filingSchema);
