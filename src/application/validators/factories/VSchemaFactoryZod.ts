import VSchemaFactory from "../../../interfaces/factories/VSchemaFactory";
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema";
import RequestsVSchemasZod from "../zod/schema/AuthVSchemaZod";

class VSchemaFactoryZod implements VSchemaFactory {
    private static instance: VSchemaFactoryZod
    public static getInstance(): VSchemaFactoryZod {
        if(!VSchemaFactoryZod.instance){
            VSchemaFactoryZod.instance = new VSchemaFactoryZod()
        }

        return VSchemaFactoryZod.instance
    }
    createAuthVSchema(): AuthVSchema {
        return RequestsVSchemasZod.getInstance()
    }
}

export default VSchemaFactoryZod