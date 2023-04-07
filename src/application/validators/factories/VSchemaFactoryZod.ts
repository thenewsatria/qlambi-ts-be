import VSchemaFactory from "../../../interfaces/factories/VSchemaFactory";
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema";
import ProductVSchema from "../../../interfaces/validators/schemas/ProductVSchema";
import TokenVSchema from "../../../interfaces/validators/schemas/TokenVSchema";
import AuthVSchemaZod from "../zod/schema/AuthVSchemaZod";
import ProductVSchemaZod from "../zod/schema/ProductVSchemaZod";
import TokenVSchemaZod from "../zod/schema/TokenVSchemaZod";

class VSchemaFactoryZod implements VSchemaFactory {
    private static instance: VSchemaFactoryZod
    public static getInstance(): VSchemaFactoryZod {
        if(!VSchemaFactoryZod.instance){
            VSchemaFactoryZod.instance = new VSchemaFactoryZod()
        }
        
        return VSchemaFactoryZod.instance
    }
    createAuthVSchema(): AuthVSchema {
        return AuthVSchemaZod.getInstance()
    }

    createTokenVSchema(): TokenVSchema {
        return TokenVSchemaZod.getInstance()
    }

    createProductVschema(): ProductVSchema {
        return ProductVSchemaZod.getInstance()
    }
    
}

export default VSchemaFactoryZod