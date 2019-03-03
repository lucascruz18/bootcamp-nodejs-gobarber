const express = require('express')
const multerConfig = require('./config/multer')

const Upload = require('multer')(multerConfig)

const routes = express.Router()

const AuthMiddleware = require('./app/middlewares/auth')
const GuestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.use('/app', AuthMiddleware)

routes.get('/files/:file', FileController.show)

routes.get('/', GuestMiddleware, SessionController.create)
routes.post('/signin', GuestMiddleware, SessionController.store)

routes.get('/signup', UserController.create)
routes.post('/signup', Upload.single('avatar'), UserController.store)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)

routes.get('/app/available/:provider', AvailableController.index)

module.exports = routes
