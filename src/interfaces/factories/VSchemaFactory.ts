import AuthVSchema from "../validators/schemas/AuthVSchema"

interface VSchemaFactory {
    createAuthVSchema(): AuthVSchema
}

export default VSchemaFactory