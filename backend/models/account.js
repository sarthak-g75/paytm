const mongoose = require('mongoose')
const { Schema } = mongoose
const AccountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
})
const Account = mongoose.model('account', AccountSchema)
module.exports = Account
