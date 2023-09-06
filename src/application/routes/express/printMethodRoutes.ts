import express from 'express'
import MiddlewareFactoryExpress from '../../middlewares/factories/MiddlewareFactoryExpress'
import VSchemaFactoryZod from '../../validators/factories/VSchemaFactoryZod'
import AllErrorToAPIErrorTranslator from '../../errors/AllErrorToAPIErrorTranslator'
import GetUserByAccesTokenUseCase from '../../usecases/middleware/GetUserByAccesTokenUseCase'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import TokenService from '../../../domain/services/TokenService'
import UserService from '../../../domain/services/UserService'
import JsonWebToken from '../../utils/token/jsonwebtoken/JsonWebToken'
import ValidatorZod from '../../validators/zod/ValidatorZod'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter'
import CreatePrintMethodUseCase from '../../usecases/printMethod/CreatePrintMethodUseCase'
import PrintMethodService from '../../../domain/services/PrintMethodService'
import GetPrintMethodDetailUseCase from '../../usecases/printMethod/GetPrintMethodDetailUseCase'

const printMethodRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const errorTranslator = AllErrorToAPIErrorTranslator.getInstance()
const presenter = ExpressJsendPresenter.getInstance()
const tokenTools = new JsonWebToken()

const repositoryFactory = RepositoryFactoryPrisma.getInstance()
const controllerFactory = ControllerFactoryExpress.getInstance()
const middlewareFactory = MiddlewareFactoryExpress.getInstance()
const valSchemaFactory = VSchemaFactoryZod.getInstance()

const tokenSchemas = valSchemaFactory.createTokenVSchema()
const printMethodSchemas = valSchemaFactory.createPrintMethodSchema()

const tokenRepository = repositoryFactory.createTokenRepository()
const userRepository = repositoryFactory.createUserRepository()
const printMethodRepository = repositoryFactory.createPrintMethodRepository()

const tokenService = new TokenService(tokenRepository, tokenTools, validator)
const userService = new UserService(userRepository, validator)
const printMethodService = new PrintMethodService(printMethodRepository, validator)

const getUserByTokenUC = new GetUserByAccesTokenUseCase(tokenService, userService)
const createPrintMethodUC = new CreatePrintMethodUseCase(printMethodService)
const getPrintMethodDetailUC = new GetPrintMethodDetailUseCase(printMethodService)

const printMethodController = controllerFactory.createPrintMethodController(printMethodSchemas, presenter, errorTranslator)

const authMW = middlewareFactory.createAuthMiddleware(tokenSchemas, errorTranslator)


printMethodRoutes.use(authMW.protect(getUserByTokenUC))
printMethodRoutes.get("/:printMethodID", printMethodController.getPrintMethodDetail(getPrintMethodDetailUC))
printMethodRoutes.use(authMW.checkAllowedRoles(['ADMIN']))
printMethodRoutes.post("/", printMethodController.createPrintMethod(createPrintMethodUC))

export default printMethodRoutes