const express = require('express')
const CookieParser = require('cookie-parser')
const BodyParser = require('body-parser')

const UserRouter = require('./user')

const app = express()

app.use(CookieParser())
app.use(BodyParser.json())

app.use('/user', UserRouter)

app.listen(9093, () => {
  console.log('Server start at port: 9093')
})