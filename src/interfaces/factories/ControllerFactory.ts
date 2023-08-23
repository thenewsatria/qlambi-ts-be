import AuthController from "../controllers/AuthController"
import ColorController from "../controllers/ColorController"
import ItemController from "../controllers/ItemController"
import ProductController from "../controllers/ProductController"
import SizeController from "../controllers/SizeController"
import TokenController from "../controllers/TokenController"
import ErrorTranslator from "../errors/ErrorTranslator"
import JsendPresenter from "../presenters/JsendPresenter"
import AuthVSchema from "../validators/schemas/AuthVSchema"
import ColorVSchema from "../validators/schemas/ColorVSchema"
import ItemVSchema from "../validators/schemas/ItemVSchema"
import ProductVSchema from "../validators/schemas/ProductVSchema"
import SizeVSchema from "../validators/schemas/SizeVSchema"
import TokenVSchema from "../validators/schemas/TokenVSchema"

interface ControllerFactory {
    createAuthController(authSchemas: AuthVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): AuthController
    createTokenController(tokenSchemas: TokenVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): TokenController
    createProductController(productSchemas: ProductVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): ProductController
    createColorController(colorSchemas: ColorVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): ColorController
    createSizeController(sizeSchemas: SizeVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): SizeController
    createItemController(itemSchemas: ItemVSchema, presenter: JsendPresenter, errorTranslator: ErrorTranslator): ItemController
}

export default ControllerFactory
