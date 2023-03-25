import express from 'express'
import TokenService from '../../../domain/services/TokenService'
import UserService from '../../../domain/services/UserService'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import ErrorTranslator from '../../errors/ErrorTranslator'
import ExpressPresenterFactory from '../../presenters/factories/ExpressPresenterFactory'
import LoginUseCase from '../../usecases/auth/LoginUseCase'
import RegisterUseCase from '../../usecases/auth/RegisterUseCase'
import BcryptHasher from '../../utils/encryption/bcrypt/BcryptHasher'
import JsonWebToken from '../../utils/token/jsonwebtoken/JsonWebToken'
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

const tokenRepository = repositoryFactory.createTokenRepository()
const tokenTools = new JsonWebToken()
const tokenService = new TokenService(tokenRepository, tokenTools)

const registerUseCase = new RegisterUseCase(userService, tokenService, hasher)
const loginUseCase = new LoginUseCase(userService, tokenService, hasher)

const authController = controllerFactory.createAuthController(schemas, presenter, errorTranslator)

authRoutes.post("/signup", authController.userRegister(registerUseCase))
authRoutes.post("/signin", authController.userLogin(loginUseCase))


export default authRoutes