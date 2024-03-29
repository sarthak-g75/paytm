const express = require('express')
const connectToMongo = require('./db')
const port = 5000
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
connectToMongo()

app.use('/api/auth', require('./routes/auth'))
app.use('/api/account', require('./routes/account'))
app.listen(port, () => {
  console.log(`app listening to http://localhost:${port}`)
})
