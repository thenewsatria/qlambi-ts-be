import AuthVSchema from "../validators/schemas/AuthVSchema"
import ProductVSchema from "../validators/schemas/ProductVSchema"
import TokenVSchema from "../validators/schemas/TokenVSchema"

interface VSchemaFactory {
    createAuthVSchema(): AuthVSchema
    createTokenVSchema(): TokenVSchema
    createProductVschema(): ProductVSchema
}

export default VSchemaFactory