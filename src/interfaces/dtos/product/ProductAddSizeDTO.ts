import Product from "../../../domain/entities/Product";
import Size from "../../../domain/entities/Size";

interface ProductAddSizeDTO {
    product: Product
    size: Size
}

export default ProductAddSizeDTO