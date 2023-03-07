import express from 'express'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
const authRoutes = express.Router()

const controllerFactory = ControllerFactoryExpress.getInstance()
const authController = controllerFactory.createAuthController()
authRoutes.get("/signin", authController.userLogin())

export default authRoutes