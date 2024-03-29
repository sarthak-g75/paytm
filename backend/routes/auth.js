const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Account = require('../models/account')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const z = require('zod')
const fetchUser = require('../middleware/fetchUser')
const secKey = process.env.SEC_KEY
// console.log(secKey)

const schema = z.object({
  fname: z.string().min(5),
  lname: z.string().min(5),
  password: z.string().min(5),
  email: z.string().email(),
})
// API to create account
router.post('/create-user', async (req, res) => {
  let success = false
  const { email, fname, lname, password } = req.body
  try {
    let user = await User.findOne({ email: email })
    if (user) {
      return res.status(400).json({
        success: success,
        message: 'user with this email already exists',
      })
    }
    const validate = schema.safeParse(req.body)
    if (!validate.success) {
      return res.status(411).json({ success: success, message: validate.error })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(password, salt)
    user = await User.create({
      fname: fname,
      lname: lname,
      email: email,
      password: secPass,
    })
    await Account.create({
      userId: user.id,
      balance: 1 + Math.random() * 10000,
    })
    success = true
    const token = jwt.sign(
      { fname: user.fname, lname: user.lname, email: user.email, id: user.id },
      secKey
    )
    return res
      .status(200)
      .json({ success: success, message: 'User created', token: token })
  } catch (error) {
    return res.status(500).json({ success: success, message: error.message })
  }
})
//  API to login into acoount
router.post('/login', async (req, res) => {
  let success = false
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      return res
        .status(404)
        .json({ success: success, message: 'User not found' })
    }
    const comparePass = await bcrypt.compare(password, user.password)
    if (!comparePass) {
      return res.status(403).json({
        success: success,
        message: ' Please enter correct credentials',
      })
    }
    success = true
    const token = jwt.sign(
      { fname: user.fname, email: email, id: user.id },
      secKey
    )
    return res
      .status(200)
      .json({ success: success, message: ' login successfull', token: token })
  } catch (error) {
    return res.status(500).json({ success: success, message: error.message })
  }
})

// API To update user details
router.put('/update-user', fetchUser, async (req, res) => {
  let success = false
  const validateSchema = z.object({
    fname: z.string().min(5).optional(),
    lname: z.string().min(5).optional(),
    password: z.string().min(5).optional(),
  })
  const { password, fname, lname } = req.body
  const { id, userFname, userLname } = req.user
  try {
    const validate = validateSchema.safeParse(req.body)
    if (!validate.success) {
      return res
        .status(411)
        .json({ success: success, message: 'Error while updating information' })
    }
    const userFound = await User.findById(id)
    let updatedPass = userFound.password
    if (password) {
      const salt = await bcrypt.genSalt(10)
      updatedPass = await bcrypt.hash(password, salt)
    }
    const user = await User.findByIdAndUpdate(id, {
      fname: fname || userFname,
      lname: lname || userLname,
      password: updatedPass,
    })
    if (user) {
      success = true
      return res
        .status(200)
        .json({ success: success, message: 'User Updated Successfully' })
    }
  } catch (error) {
    return res.status(500).json({ success: success, message: error.message })
  }
})

// API to get users in bulk and add filter
router.get('/bulk', async (req, res) => {
  const filter = req.query.filter || ''
  try {
    const users = await User.find({
      $or: [
        {
          fname: {
            $regex: filter,
          },
        },
        {
          lname: {
            $regex: filter,
          },
        },
      ],
    })
    return res.status(200).json({ users: users })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// Api to get user detail using ID
router.get('/get-user/:id', async (req, res) => {
  const userId = req.params.id
  let success = false
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: success, message: 'please enter user Id' })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: success,
        message: 'No user with this Id was found',
      })
    } else {
      // console.log(user)
      success = true
      return res
        .status(200)
        .json({ success: success, message: 'user Found', user: user })
    }
  } catch (error) {
    return res.status(500).json({ success: success, message: error.message })
  }
})
module.exports = router
