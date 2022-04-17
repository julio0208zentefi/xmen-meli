'use strict'

// Requires -------------------------------------------------------------------
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const app = express()

// App Uses -------------------------------------------------------------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// Swagger -------------------------------------------------------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')))
app.get('/api-docs.json', (req, res) => {
  res.sendFile('./swagger.json', { root: __dirname })
})

// Routes -------------------------------------------------------------------
require('./app/routes')(app)

// Server listen -------------------------------------------------------------------
app.listen(process.env.HTTP_PORT, process.env.HTTP_LISTEN)
console.log(`Server Ready on ${process.env.HTTP_LISTEN}:${process.env.HTTP_PORT}`)
