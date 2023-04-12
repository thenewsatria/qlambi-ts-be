import { NextFunction } from 'connect'
import express, {Request, Response} from 'express'
import ProductService from '../../../domain/services/ProductService'
import TokenService from '../../../domain/services/TokenService'
import UserService from '../../../domain/services/UserService'
import RepositoryFactoryPrisma from '../../../infrastructure/repositories/factories/RepositoryFactoryPrisma'
import ControllerFactoryExpress from '../../controllers/factories/ControllerFactoryExpress'
import AllErrorToAPIErrorTranslator from '../../errors/AllErrorToAPIErrorTranslator'
import MiddlewareFactoryExpress from '../../middlewares/factories/MiddlewareFactoryExpress'
import ExpressJsendPresenter from '../../presenters/express/ExpressJsendPresenter'
import GetUserByAccesTokenUseCase from '../../usecases/middleware/GetUserByAccesTokenUseCase'
import AddProductUseCase from '../../usecases/product/AddProductUseCase'
import GetProductDetailUseCase from '../../usecases/product/GetProductDetailUseCase'
import GetProductListUseCase from '../../usecases/product/GetProductListUseCase'
import RemoveProductUseCase from '../../usecases/product/RemoveProductUseCase'
import ToggleProductActiveUseCase from '../../usecases/product/ToggleProductActiveUseCase'
import UpdateProductUseCase from '../../usecases/product/UpdateProductUseCase'
import JsonWebToken from '../../utils/token/jsonwebtoken/JsonWebToken'
import VSchemaFactoryZod from '../../validators/factories/VSchemaFactoryZod'
import ValidatorZod from '../../validators/zod/ValidatorZod'

const productRoutes = express.Router()

const validator = ValidatorZod.getInstance()
const presenter = ExpressJsendPresenter.getInstance()
const errorTranslator = AllErrorToAPIErrorTranslator.getInstance()
const tokenTools = new JsonWebToken()

const repositoryFactory = RepositoryFactoryPrisma.getInstance()
const controllerFactory = ControllerFactoryExpress.getInstance()
const middlewareFactory = MiddlewareFactoryExpress.getInstance()
const valSchemaFactory = VSchemaFactoryZod.getInstance() 

const productRepository = repositoryFactory.createProductRepository()
const tokenRepository = repositoryFactory.createTokenRepository()
const userRepository = repositoryFactory.createUserRepository()

const productSchemas = valSchemaFactory.createProductVschema()
const tokenSchemas = valSchemaFactory.createTokenVSchema()


const productService = new ProductService(productRepository, validator)
const tokenService = new TokenService(tokenRepository, tokenTools, validator)
const userService = new UserService(userRepository, validator)

const productController = controllerFactory.createProductController(productSchemas, presenter, errorTranslator)

const getUserByTokenUC = new GetUserByAccesTokenUseCase(tokenService, userService)
const addProductUC = new AddProductUseCase(productService)
const updateProductUC = new UpdateProductUseCase(productService)
const getProductDetailUC = new GetProductDetailUseCase(productService)
const toggleProductActiveUC = new ToggleProductActiveUseCase(productService)
const removeProductUC = new RemoveProductUseCase(productService)
const getProductListUC = new GetProductListUseCase(productService)

const authMW = middlewareFactory.createAuthMiddleware(tokenSchemas, errorTranslator)

productRoutes.use(authMW.protect(getUserByTokenUC))
productRoutes.use(authMW.checkAllowedRoles(['ADMIN']))
productRoutes.post('/', productController.addProduct(addProductUC))
productRoutes.get('/', productController.getProductList(getProductListUC))
productRoutes.route('/:productID')
    .get(productController.getProductDetail(getProductDetailUC))
    .put(productController.updateProduct(updateProductUC))
    .delete(productController.removeProduct(removeProductUC))

productRoutes.put('/toggle/:productID', productController.toggleProductActive(toggleProductActiveUC))

export default productRoutes