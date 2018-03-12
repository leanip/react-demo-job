const express = require('express')
const utils = require('utility')

const models = require('./model')

const User = models.getModel('user')
const Chat = models.getModel('chat')
const Router = express.Router()
const _filter = { pwd: 0, __v: 0 }

const md5Pwd = pwd => {
  const salt = 'imooc_react_6AS9zOAb1^EwVjOko*ywz1pz6n0&psyR'
  return utils.md5(utils.md5(pwd + salt))
}

Router.get('/getmsglist', (req, res) => {
  Chat.find({}, (err, doc) => {
    if(!err){
      return res.json({code: 0, data: doc})
    }
  })
})

Router.get('/list', (req, res) => {
  // User.remove({}, () => res.json('remove all')) ;return;
  const { query } = req
  const condition = query ? query : {}
  User.find(condition, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器出错了' })
    }
    return res.json({ code: 0, data: doc })
  })
})

Router.get('/info', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1, msg: 'cookie不存在或已过期，请重新登录' })
  }

  User.findOne({ _id: userid }, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器出错了' })
    }
    if (doc) {
      res.cookie('userid', doc._id)
      return res.json({ code: 0, data: doc })
    }
    return res.json({ code: 1, msg: '用户ID错误，请重新登录' })
  })
})

Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器出错了' })
    }
    if (doc) {
      res.cookie('userid', doc._id)
      return res.json({ code: 0, data: doc })
    }
    return res.json({ code: 1, msg: '用户名或密码错误' })
  })
})

Router.post('/update', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1, msg: 'cookie不存在或已过期，请重新登录' })
  }
  const body = req.body
  User.findByIdAndUpdate({ _id: userid }, body, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器出错了' })
    }
    if (doc) {
      const data = Object.assign({}, {
        user: doc.user,
        type: doc.type
      }, body)
      res.cookie('userid', userid)
      return res.json({ data, code: 0 })
    }
  })
})

Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({ user }, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器出错了' })
    }
    if (doc) {
      return res.json({ code: 1, msg: '用户名已经存在' })
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
    userModel.save((e, d) => {
      if (e) {
        return res.json({ code: 1, msg: '服务器出错了' })
      }
      if (d) {
        const { user, type, _id } = d
        res.cookie('userid', _id)
        return res.json({ code: 0, data: { user, type, _id } })
      }
    })
  })
})

module.exports = Router