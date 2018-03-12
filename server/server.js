const express = require('express')
const CookieParser = require('cookie-parser')
const BodyParser = require('body-parser')

const UserRouter = require('./user')
const models = require('./model')

const app = express()
const Chat = models.getModel('chat')

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  socket.on('sendmsg', data => {
    console.log(data)
    const { from, to, msg} = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg}, (err,doc) => {
      if(!err){
        io.emit('recvmsg', {code: 0, data:doc._doc})
      }
    })
  })
})

app.use(CookieParser())
app.use(BodyParser.json())

app.use('/user', UserRouter)

server.listen(9093, () => {
  console.log('Server start at port: 9093')
})