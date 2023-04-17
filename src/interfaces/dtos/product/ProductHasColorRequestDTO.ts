import Color from "../../../domain/entities/Color"
import Product from "../../../domain/entities/Product"

interface ProductHasColorDTO {
    product: Product
    color: Color
}

export default ProductHasColorDTO