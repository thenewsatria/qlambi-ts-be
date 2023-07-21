import express from "express"
import { Prisma } from "@prisma/client"
import MiddlewareFactoryExpress from "../../middlewares/factories/MiddlewareFactoryExpress"
import VSchemaFactoryZod from "../../validators/factories/VSchemaFactoryZod"
import AllErrorToAPIErrorTranslator from "../../errors/AllErrorToAPIErrorTranslator"
import TokenService from "../../../domain/services/TokenService"
import UserService from "../../../domain/services/UserService"
import RepositoryFactoryPrisma from "../../../infrastructure/repositories/factories/RepositoryFactoryPrisma"
import JsonWebToken from "../../utils/token/jsonwebtoken/JsonWebToken"
import ValidatorZod from "../../validators/zod/ValidatorZod"
import GetUserByAccesTokenUseCase from "../../usecases/middleware/GetUserByAccesTokenUseCase"
import ControllerFactoryExpress from "../../controllers/factories/ControllerFactoryExpress"
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter"
import CreateItemUseCase from "../../usecases/item/CreateItemUseCase"
import ItemService from "../../../domain/services/ItemService"

const itemRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const presenter = ExpressJsendPresenter.getInstance()
const errorTranslator = AllErrorToAPIErrorTranslator.getInstance()
const tokenTools = new JsonWebToken()

const repositoryFactory = RepositoryFactoryPrisma.getInstance()
const valSchemaFactory = VSchemaFactoryZod.getInstance()
const controllerFactory = ControllerFactoryExpress.getInstance()

const tokenRepository = repositoryFactory.createTokenRepository()
const userRepository = repositoryFactory.createUserRepository()
const itemRepository = repositoryFactory.createItemRepository()

const tokenSchemas = valSchemaFactory.createTokenVSchema()
const itemSchemas = valSchemaFactory.createItemVSchema()

const middlewareFactory = MiddlewareFactoryExpress.getInstance()

const tokenService = new TokenService(tokenRepository, tokenTools, validator)
const userService = new UserService(userRepository, validator)
const itemService = new ItemService(itemRepository, validator)

const itemController = controllerFactory.createItemController(itemSchemas, presenter, errorTranslator)

const getUserByTokenUC = new GetUserByAccesTokenUseCase(tokenService, userService)
const createItemUC = new CreateItemUseCase(itemService)

const authMW = middlewareFactory.createAuthMiddleware(tokenSchemas, errorTranslator)

itemRoutes.use(authMW.protect(getUserByTokenUC))
itemRoutes.use(authMW.checkAllowedRoles(['ADMIN']))
itemRoutes.post('/', itemController.createItem(createItemUC))

export default itemRoutes