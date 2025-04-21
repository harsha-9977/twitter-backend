const mongoose = require('mongoose');

const TwitterSchema = new mongoose.Schema({
  followers: Number,
  tweets_count: Number,
  listed_count: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TwitterStat', TwitterSchema);
