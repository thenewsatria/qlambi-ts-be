import express from 'express'
import UserService from '../../../domain/services/UserService'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import ErrorTranslator from '../../errors/ErrorTranslator'
import ExpressPresenterFactory from '../../presenters/factories/ExpressPresenterFactory'
import RegisterUseCase from '../../usecases/auth/RegisterUseCase'
import BcryptHasher from '../../utils/encryption/bcrypt/BcryptHasher'
import VSchemaFactoryZod from '../../validators/factories/VSchemaFactoryZod'
import ValidatorZod from '../../validators/zod/ValidatorZod'

const authRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const hasher = BcryptHasher.getInstance()
const presenter = ExpressPresenterFactory.getInstance().createJsendPresenter()
const schemas = VSchemaFactoryZod.getInstance().createAuthVSchema()
const errorTranslator = ErrorTranslator.getInstance()

const controllerFactory = ControllerFactoryExpress.getInstance()
const repositoryFactory = RepositoryFactoryPrisma.getInstance()


const userRepository = repositoryFactory.createUserRepository()
const userService = new UserService(userRepository, validator)

const registerUseCase = new RegisterUseCase(userService, hasher)

const authController = controllerFactory.createAuthController(schemas, presenter, errorTranslator)
authRoutes.get("/signin", authController.userLogin())
authRoutes.post("/signup", authController.userRegister(registerUseCase))


export default authRoutes