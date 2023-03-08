import express from 'express'
import UserService from '../../../domain/services/UserService'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import RegisterUseCase from '../../usecases/auth/RegisterUseCase'
const authRoutes = express.Router()

const controllerFactory = ControllerFactoryExpress.getInstance()
const repositoryFactory = RepositoryFactoryPrisma.getInstance()


const userRepository = repositoryFactory.createUserRepository()
const userService = new UserService(userRepository)
const registerUseCase = new RegisterUseCase(userService)

const authController = controllerFactory.createAuthController(registerUseCase)
authRoutes.get("/signin", authController.userLogin())
authRoutes.post("/signup", authController.userRegister())


export default authRoutes