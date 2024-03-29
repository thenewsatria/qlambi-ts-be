import express from 'express'
import ProductService from '../../../domain/services/ProductService'
import SizeService from '../../../domain/services/SizeService'
import TokenService from '../../../domain/services/TokenService'
import UserService from '../../../domain/services/UserService'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import AllErrorToAPIErrorTranslator from '../../errors/AllErrorToAPIErrorTranslator'
import MiddlewareFactoryExpress from '../../middlewares/factories/MiddlewareFactoryExpress'
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter'
import GetUserByAccesTokenUseCase from '../../usecases/middleware/GetUserByAccesTokenUseCase'
import AddSizeUseCase from '../../usecases/size/AddSizeUseCase'
import DeleteSizeUseCase from '../../usecases/size/DeleteSizeUseCase'
import GetSizeDetailUseCase from '../../usecases/size/GetSizeDetailUseCase'
import ToggleSizeActiveUseCase from '../../usecases/size/ToggleSizeActiveUseCase'
import UpdateSizeUseCase from '../../usecases/size/UpdateSizeUseCase'
import JsonWebToken from '../../utils/token/jsonwebtoken/JsonWebToken'
import VSchemaFactoryZod from '../../validators/factories/VSchemaFactoryZod'
import ValidatorZod from '../../validators/zod/ValidatorZod'

const sizeRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const presenter = ExpressJsendPresenter.getInstance()
const errorTranslator = AllErrorToAPIErrorTranslator.getInstance()
const tokenTools = new JsonWebToken()

const valSchemaFactory = VSchemaFactoryZod.getInstance() 

const tokenSchemas = valSchemaFactory.createTokenVSchema()
const sizeSchemas = valSchemaFactory.createSizeVSchema()

const repositoryFactory = RepositoryFactoryPrisma.getInstance()
const controllerFactory = ControllerFactoryExpress.getInstance()
const middlewareFactory = MiddlewareFactoryExpress.getInstance()

const tokenRepository = repositoryFactory.createTokenRepository()
const userRepository = repositoryFactory.createUserRepository()
const sizeRepository = repositoryFactory.createSizeRepository()
const productRepository = repositoryFactory.createProductRepository()

const tokenService = new TokenService(tokenRepository, tokenTools, validator)
const userService = new UserService(userRepository, validator)
const sizeService = new SizeService(sizeRepository, validator)
const productService = new ProductService(productRepository, validator)

const authMW = middlewareFactory.createAuthMiddleware(tokenSchemas, errorTranslator)

const getUserByTokenUC = new GetUserByAccesTokenUseCase(tokenService, userService)
const addSizeUC = new AddSizeUseCase(sizeService, productService)
const updateSizeUC = new UpdateSizeUseCase(sizeService)
const toggleSizeActiveUC = new ToggleSizeActiveUseCase(sizeService)
const getSizeDetailUC = new GetSizeDetailUseCase(sizeService)
const deleteSizeUC = new DeleteSizeUseCase(sizeService)

const sizeController = controllerFactory.createSizeController(sizeSchemas, presenter, errorTranslator)

sizeRoutes.use(authMW.protect(getUserByTokenUC))
sizeRoutes.use(authMW.checkAllowedRoles(['ADMIN']))

// add or remove size from product
sizeRoutes.put('/toggle/:sizeID', sizeController.toggleSizeActive(toggleSizeActiveUC))
sizeRoutes.post('/add/:productID', sizeController.addSizeToProduct(addSizeUC))
sizeRoutes.route("/:sizeID")
    .put(sizeController.updateSize(updateSizeUC))
    .get(sizeController.getSizeDetail(getSizeDetailUC))
    .delete(sizeController.deleteSize(deleteSizeUC))
export default sizeRoutes