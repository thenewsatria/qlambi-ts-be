import AuthVSchema from "../validators/schemas/AuthVSchema"
import ColorVSchema from "../validators/schemas/ColorVSchema"
import ProductVSchema from "../validators/schemas/ProductVSchema"
import TokenVSchema from "../validators/schemas/TokenVSchema"

interface VSchemaFactory {
    createAuthVSchema(): AuthVSchema
    createTokenVSchema(): TokenVSchema
    createProductVSchema(): ProductVSchema
    createColorVSchema(): ColorVSchema
}

export default VSchemaFactory