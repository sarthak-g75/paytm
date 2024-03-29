const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGO_URI
const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('connected to database')
    })
    .catch((err) => console.log(err.message))
}
module.exports = connectToMongo
