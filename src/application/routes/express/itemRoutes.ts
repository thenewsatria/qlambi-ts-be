import express from "express"
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
import ProductService from "../../../domain/services/ProductService"
import ColorService from "../../../domain/services/ColorService"
import SizeService from "../../../domain/services/SizeService"
import GetItemDetailUseCase from "../../usecases/item/GetItemDetailUseCase"
import ToggleItemActiveUseCase from "../../usecases/item/ToggleItemActiveUseCase"
import RemoveItemUseCase from "../../usecases/item/RemoveItemUseCase"
import GetItemListUseCase from "../../usecases/item/GetItemListUseCase"
import UpdateItemUseCase from "../../usecases/item/UpdateItemUseCase"
import UploadItemImageUseCase from "../../usecases/item/UploadItemImageUseCase"
import RemoveItemImageUseCase from "../../usecases/item/RemoveItemImageUseCase"

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
const productRepository = repositoryFactory.createProductRepository()
const colorRepository = repositoryFactory.createColorRepository()
const sizeRepository = repositoryFactory.createSizeRepository()

const tokenSchemas = valSchemaFactory.createTokenVSchema()
const itemSchemas = valSchemaFactory.createItemVSchema()

const middlewareFactory = MiddlewareFactoryExpress.getInstance()

const tokenService = new TokenService(tokenRepository, tokenTools, validator)
const userService = new UserService(userRepository, validator)
const itemService = new ItemService(itemRepository, validator)
const productService = new ProductService(productRepository, validator)
const colorService = new ColorService(colorRepository, validator)
const sizeService = new SizeService(sizeRepository, validator)

const itemController = controllerFactory.createItemController(itemSchemas, presenter, errorTranslator)

const getUserByTokenUC = new GetUserByAccesTokenUseCase(tokenService, userService)
const createItemUC = new CreateItemUseCase(itemService, productService, colorService, sizeService)
const getItemDetailUC = new GetItemDetailUseCase(itemService)
const toggleItemActiveUC = new ToggleItemActiveUseCase(itemService)
const removeItemUC = new RemoveItemUseCase(itemService)
const getItemListUC = new GetItemListUseCase(itemService)
const updateItemUC = new UpdateItemUseCase(itemService, productService, colorService, sizeService)
const uploadItemImageUC = new UploadItemImageUseCase(itemService)
const removeItemImageUC = new RemoveItemImageUseCase(itemService)

const authMW = middlewareFactory.createAuthMiddleware(tokenSchemas, errorTranslator)
const validationMW = middlewareFactory.createValidationMiddleware()
const queryMW = middlewareFactory.createQueryMiddleware()

const handlerMW = middlewareFactory.createHandlerMiddleware()
const fileUploadMW = handlerMW.handleFileUpload()("public/items", [".png", ".jpeg", ".jpg"], 512 * 1024)

itemRoutes.use(authMW.protect(getUserByTokenUC))
itemRoutes.get("/", queryMW.filterItemQuery(), itemController.getItemList(getItemListUC))
itemRoutes.get("/:itemID", itemController.getItemDetail(getItemDetailUC))
itemRoutes.use(authMW.checkAllowedRoles(['ADMIN']))
itemRoutes.post('/', 
    fileUploadMW.array("itemImages", 5),
    validationMW.checkFilesMimetype(["image/png", "image/jpeg"]),
    validationMW.checkFileSize(512*1024),
    itemController.createItem(createItemUC))
itemRoutes.route("/upload/:itemID")
    .put(fileUploadMW.single("itemImage"),
        validationMW.checkFilesMimetype(["image/png", "image/jpeg"]),
        validationMW.checkFileSize(512*1024),
        itemController.uploadItemImage(uploadItemImageUC))
    .delete(itemController.removeItemImage(removeItemImageUC))
itemRoutes.route('/:itemID')
    .put(itemController.updateItem(updateItemUC))
    .delete(itemController.removeItem(removeItemUC))
itemRoutes.put("/toggle/:itemID", 
    itemController.toggleItemActive(toggleItemActiveUC))

export default itemRoutes