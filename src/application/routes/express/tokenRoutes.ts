import express from 'express'
import TokenService from '../../../domain/services/TokenService'
import UserService from '../../../domain/services/UserService'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import AllErrorToAPIErrorTranslator from '../../errors/AllErrorToAPIErrorTranslator'
import ExpressPresenterFactory from '../../presenters/factories/ExpressPresenterFactory'
import RenewAccessTokenUseCase from '../../usecases/token/RenewAccessTokenUseCase'
import JsonWebToken from '../../utils/token/jsonwebtoken/JsonWebToken'
import VSchemaFactoryZod from '../../validators/factories/VSchemaFactoryZod'
import ValidatorZod from '../../validators/zod/ValidatorZod'

const tokenRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const schema = VSchemaFactoryZod.getInstance().createTokenVSchema()
const presenter = ExpressPresenterFactory.getInstance().createJsendPresenter()
const errorTranslator = AllErrorToAPIErrorTranslator.getInstance()

const repositoryFactory = RepositoryFactoryPrisma.getInstance()
const controllerFactory = ControllerFactoryExpress.getInstance()

const tokenTools = new JsonWebToken()

const tokenRepository = repositoryFactory.createTokenRepository()
const userRepository = repositoryFactory.createUserRepository()

const tokenService = new TokenService(tokenRepository, tokenTools, validator)
const userService = new UserService(userRepository, validator)

const renewAccessTokenUC = new RenewAccessTokenUseCase(tokenService, userService)

const tokenController = controllerFactory.createTokenController(schema, presenter, errorTranslator)

tokenRoutes.post("/refresh", tokenController.refreshToken(renewAccessTokenUC))

export default tokenRoutes