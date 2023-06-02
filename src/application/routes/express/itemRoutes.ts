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

const itemRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const errorTranslator = AllErrorToAPIErrorTranslator.getInstance()
const tokenTools = new JsonWebToken()

const repositoryFactory = RepositoryFactoryPrisma.getInstance()
const valSchemaFactory = VSchemaFactoryZod.getInstance()
const controllerFactory = ControllerFactoryExpress.getInstance()

const tokenRepository = repositoryFactory.createTokenRepository()
const userRepository = repositoryFactory.createUserRepository()


const tokenSchemas = valSchemaFactory.createTokenVSchema()

const middlewareFactory = MiddlewareFactoryExpress.getInstance()

const tokenService = new TokenService(tokenRepository, tokenTools, validator)
const userService = new UserService(userRepository, validator)

const getUserByTokenUC = new GetUserByAccesTokenUseCase(tokenService, userService)

const authMW = middlewareFactory.createAuthMiddleware(tokenSchemas, errorTranslator)

itemRoutes.use(authMW.protect(getUserByTokenUC))
itemRoutes.use(authMW.checkAllowedRoles(['ADMIN']))
itemRoutes.post('/', )

export default itemRoutes