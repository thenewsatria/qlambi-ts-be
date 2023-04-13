import ProductGeneralResponseDTO from "./ProductGeneralResponse";

interface ProductGeneralListResponseDTO {
    count: number;
    products: ProductGeneralResponseDTO[];
}

export default ProductGeneralListResponseDTO