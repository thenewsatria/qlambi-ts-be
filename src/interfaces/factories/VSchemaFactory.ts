import AuthVSchema from "../validators/schemas/AuthVSchema"
import TokenVSchema from "../validators/schemas/TokenVSchema"

interface VSchemaFactory {
    createAuthVSchema(): AuthVSchema
    createTokenVSchema(): TokenVSchema
}

export default VSchemaFactory