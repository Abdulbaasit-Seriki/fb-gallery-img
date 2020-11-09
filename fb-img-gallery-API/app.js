const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const connectToDB = require('./config/db')


// Load Config files
dotenv.config({ path: './config/config.env' })

const app = express()
connectToDB()

app.use(cors())

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Routes
const indexRoute = require('./routes/index')
app.use('/', indexRoute)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))
