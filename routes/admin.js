const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const Flat = require('../models/Flat')

AdminJS.registerAdapter(AdminJSMongoose)

const adminJSOptions = {
  resources: [Flat],
  rootPath: '/admin',
  branding: {
    companyName: 'Skany',
  },
}

const adminJs = new AdminJS(adminJSOptions)

const adminJsRouter = AdminJSExpress.buildRouter(adminJs)

module.exports = { adminJsRouter, adminJs }
