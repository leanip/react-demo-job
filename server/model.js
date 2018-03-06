const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/react-job'

mongoose.connect(DB_URL)

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    // 头像
    avatar: { type: String },
    // 职位名称
    title: { type: String },
    // 职位要求，个人简介
    desc: { type: String },
    // 如果是Boss
    company: { type: String },
    money: { type: String }
  },
  chat: {}
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

const getModel = name => mongoose.model(name)

module.exports = {
  getModel
}
