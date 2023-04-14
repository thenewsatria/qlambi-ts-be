import express from 'express'
import ColorService from '../../../domain/services/ColorService'
import TokenService from '../../../domain/services/TokenService'
import UserService from '../../../domain/services/UserService'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import AllErrorToAPIErrorTranslator from '../../errors/AllErrorToAPIErrorTranslator'
import MiddlewareFactoryExpress from '../../middlewares/factories/MiddlewareFactoryExpress'
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter'
import AddColorUseCase from '../../usecases/color/AddColorUseCase'
import GetUserByAccesTokenUseCase from '../../usecases/middleware/GetUserByAccesTokenUseCase'
import JsonWebToken from '../../utils/token/jsonwebtoken/JsonWebToken'
import VSchemaFactoryZod from '../../validators/factories/VSchemaFactoryZod'
import ValidatorZod from '../../validators/zod/ValidatorZod'

const colorRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const presenter = ExpressJsendPresenter.getInstance()
const errorTranslator = AllErrorToAPIErrorTranslator.getInstance()
const tokenTools = new JsonWebToken()

const repositoryFactory = RepositoryFactoryPrisma.getInstance()
const controllerFactory = ControllerFactoryExpress.getInstance()
const middlewareFactory = MiddlewareFactoryExpress.getInstance()
const valSchemaFactory = VSchemaFactoryZod.getInstance()


const colorRepository = repositoryFactory.createColorRepository()
const tokenRepository = repositoryFactory.createTokenRepository()
const userRepository = repositoryFactory.createUserRepository()

const colorSchemas = valSchemaFactory.createColorVSchema()
const tokenSchemas = valSchemaFactory.createTokenVSchema()
const colorController = controllerFactory.createColorController(colorSchemas, presenter, errorTranslator)

const colorService = new ColorService(colorRepository, validator)
const tokenService = new TokenService(tokenRepository, tokenTools, validator)
const userService = new UserService(userRepository, validator)

const authMW = middlewareFactory.createAuthMiddleware(tokenSchemas, errorTranslator)

const addColorUC = new AddColorUseCase(colorService)
const getUserByTokenUC = new GetUserByAccesTokenUseCase(tokenService, userService)

colorRoutes.use(authMW.protect(getUserByTokenUC))
colorRoutes.use(authMW.checkAllowedRoles(['ADMIN']))
colorRoutes.post('/', colorController.addColor(addColorUC))
export default colorRoutes
