import VSchemaFactory from "../../../interfaces/factories/VSchemaFactory";
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema";
import ColorVSchema from "../../../interfaces/validators/schemas/ColorVSchema";
import ItemVSchema from "../../../interfaces/validators/schemas/ItemVSchema";
import ProductVSchema from "../../../interfaces/validators/schemas/ProductVSchema";
import SizeVSchema from "../../../interfaces/validators/schemas/SizeVSchema";
import TokenVSchema from "../../../interfaces/validators/schemas/TokenVSchema";
import AuthVSchemaZod from "../zod/schema/AuthVSchemaZod";
import ColorVSchemaZod from "../zod/schema/ColorVSchemaZod";
import ItemVSchemaZod from "../zod/schema/ItemVSchemaZod";
import ProductVSchemaZod from "../zod/schema/ProductVSchemaZod";
import SizeVSchemaZod from "../zod/schema/SizeVSchemaZod";
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

    createProductVSchema(): ProductVSchema {
        return ProductVSchemaZod.getInstance()
    }

    createColorVSchema(): ColorVSchema {
        return ColorVSchemaZod.getInstance()
    }

    createSizeVSchema(): SizeVSchema {
        return SizeVSchemaZod.getInstance()
    }
    
    createItemVSchema(): ItemVSchema {
        return ItemVSchemaZod.getInstance()
    }
}

export default VSchemaFactoryZod