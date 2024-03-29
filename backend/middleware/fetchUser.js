const jwt = require('jsonwebtoken')
const secKey = process.env.SEC_KEY

const fetchUser = (req, res, next) => {
  const auth = req.headers.token
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(403).json({
      message: 'Please Login first to proceed further',
    })
  }
  const token = auth.split(' ')[1]
  try {
    const decode = jwt.verify(token, secKey)
    if (decode) {
      req.user = decode
      next()
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
module.exports = fetchUser
