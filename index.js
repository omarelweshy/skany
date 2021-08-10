const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const { adminJs } = require('./routes/admin')

// Conncting to MongoDB
mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

// Setting express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Require Models
require('./models/Flat')

// Require Routes
const flatRouter = require('./routes/flatRoutes')
const { adminJsRouter } = require('./routes/admin')

// Use Routes
app.use('/flat', flatRouter)
app.use(adminJs.options.rootPath, adminJsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server run at http://localhost:${PORT}`)
})
