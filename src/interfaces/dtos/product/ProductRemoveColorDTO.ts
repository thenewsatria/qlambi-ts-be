import Color from "../../../domain/entities/Color";
import Product from "../../../domain/entities/Product";

interface ProductRemoveColorDTO {
    product: Product;
    color: Color;
}

export default ProductRemoveColorDTO