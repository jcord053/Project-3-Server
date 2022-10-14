const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  scorecards: [{
    type: Schema.Types.ObjectId,
    ref: 'Scorecard'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;