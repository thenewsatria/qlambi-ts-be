import Color from "../../../domain/entities/Color";
import Product from "../../../domain/entities/Product";

interface ProductAddColorDTO {
    product: Product;
    color: Color;
    asssigner: string;
}

export default ProductAddColorDTO