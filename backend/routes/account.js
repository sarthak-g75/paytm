const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Account = require('../models/account')
const { default: mongoose } = require('mongoose')
const User = require('../models/User')

// Api to get balance of a logged in user
router.get('/balance', fetchUser, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.user.id })
    return res.status(200).json({ balance: account.balance })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// Api to send Money to a user:
router.post('/transfer', fetchUser, async (req, res) => {
  let success = false
  try {
    const { amount, to } = req.body
    const session = await mongoose.startSession()
    session.startTransaction()
    const account = await Account.findOne({ userId: req.user.id }).session(
      session
    )
    if (!account || account.balance < amount) {
      await session.abortTransaction()
      return res
        .status(400)
        .json({ success: success, message: 'Insufficient balance' })
    }
    const toAccount = await Account.findOne({ userId: to }).session(session)
    if (!toAccount) {
      await session.abortTransaction()
      return res
        .status(400)
        .json({ success: success, message: ' Invalid Account' })
    }
    await Account.updateOne(
      { userId: req.user.id },
      { $inc: { balance: -amount } }
    ).session(session)
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session)

    await session.commitTransaction()
    success = true
    return res
      .status(200)
      .json({ success: success, message: 'transfer successfull' })
  } catch (error) {
    return res.status(500).json({ success: success, message: error.message })
  }
})

module.exports = router
