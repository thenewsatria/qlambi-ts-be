import express from 'express'
import UserService from '../../../domain/services/UserService'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import RegisterUseCase from '../../usecases/auth/RegisterUseCase'
import VSchemaFactoryZod from '../../validators/factories/VSchemaFactoryZod'
import ValidatorZod from '../../validators/zod/ValidatorZod'
const authRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const schemas = VSchemaFactoryZod.getInstance().createAuthVSchema()

const controllerFactory = ControllerFactoryExpress.getInstance()
const repositoryFactory = RepositoryFactoryPrisma.getInstance()


const userRepository = repositoryFactory.createUserRepository()
const userService = new UserService(userRepository)
const registerUseCase = new RegisterUseCase(userService, validator)

const authController = controllerFactory.createAuthController(registerUseCase, schemas)
authRoutes.get("/signin", authController.userLogin())
authRoutes.post("/signup", authController.userRegister())


export default authRoutes