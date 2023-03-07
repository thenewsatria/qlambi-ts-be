import express from 'express'
import ExpressControllerFactory from '../../controllers/factories/ExpressControllerFactory'
const authRoutes = express.Router()

const controllerFactory = ExpressControllerFactory.getInstance()
const authController = controllerFactory.createAuthController()
authRoutes.get("/signin", authController.userLogin())

export default authRoutes