import express from 'express'
import TokenService from '../../../domain/services/TokenService'
import UserService from '../../../domain/services/UserService'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import AllErrorToAPIErrorTranslator from '../../errors/AllErrorToAPIErrorTranslator'
import MiddlewareFactoryExpress from '../../middlewares/factories/MiddlewareFactoryExpress'
import ExpressPresenterFactory from '../../presenters/factories/ExpressPresenterFactory'
import LoginUseCase from '../../usecases/auth/LoginUseCase'
import LogoutUseCase from '../../usecases/auth/LogoutUseCase'
import RegisterUseCase from '../../usecases/auth/RegisterUseCase'
import GetUserByEmailUsecase from '../../usecases/middleware/GetUserByEmailUseCase'
import BcryptHasher from '../../utils/encryption/bcrypt/BcryptHasher'
import JsonWebToken from '../../utils/token/jsonwebtoken/JsonWebToken'
import VSchemaFactoryZod from '../../validators/factories/VSchemaFactoryZod'
import ValidatorZod from '../../validators/zod/ValidatorZod'

const authRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const hasher = BcryptHasher.getInstance()
const presenter = ExpressPresenterFactory.getInstance().createJsendPresenter()
const schemas = VSchemaFactoryZod.getInstance().createAuthVSchema()
const errorTranslator = AllErrorToAPIErrorTranslator.getInstance()

const controllerFactory = ControllerFactoryExpress.getInstance()
const repositoryFactory = RepositoryFactoryPrisma.getInstance()
const middlewareFactory = MiddlewareFactoryExpress.getInstance()

const userRepository = repositoryFactory.createUserRepository()
const userService = new UserService(userRepository, validator)

const tokenRepository = repositoryFactory.createTokenRepository()
const tokenTools = new JsonWebToken()
const tokenService = new TokenService(tokenRepository, tokenTools)

const authMW = middlewareFactory.createAuthMiddleware(tokenTools, errorTranslator)

const registerUseCase = new RegisterUseCase(userService, tokenService, hasher)
const loginUseCase = new LoginUseCase(userService, tokenService, hasher)
const getUserByEmailMWUseCase = new GetUserByEmailUsecase(userService)
const logoutUseCase = new LogoutUseCase(tokenService)

const authController = controllerFactory.createAuthController(schemas, presenter, errorTranslator)

authRoutes.post("/signup", authController.userRegister(registerUseCase))
authRoutes.post("/signin", authController.userLogin(loginUseCase))

authRoutes.use(authMW.protect(getUserByEmailMWUseCase))
authRoutes.post('/logout', authController.userLogout(logoutUseCase))


export default authRoutes