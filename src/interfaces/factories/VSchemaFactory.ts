import AuthVSchema from "../validators/schemas/AuthVSchema"
import ColorVSchema from "../validators/schemas/ColorVSchema"
import ItemVSchema from "../validators/schemas/ItemVSchema"
import PrintMethodVSchema from "../validators/schemas/PrintMethodVSchema"
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
    createPrintMethodSchema(): PrintMethodVSchema
}

export default VSchemaFactory