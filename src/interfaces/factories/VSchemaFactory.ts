import AuthVSchema from "../validators/schemas/AuthVSchema"
import ColorVSchema from "../validators/schemas/ColorVSchema"
import ProductVSchema from "../validators/schemas/ProductVSchema"
import SizeVSchema from "../validators/schemas/SizeVSchema"
import TokenVSchema from "../validators/schemas/TokenVSchema"

interface VSchemaFactory {
    createAuthVSchema(): AuthVSchema
    createTokenVSchema(): TokenVSchema
    createProductVSchema(): ProductVSchema
    createColorVSchema(): ColorVSchema
    createSizeVSchema(): SizeVSchema
    createItemVSchema(): ItemVSchema
}

export default VSchemaFactory