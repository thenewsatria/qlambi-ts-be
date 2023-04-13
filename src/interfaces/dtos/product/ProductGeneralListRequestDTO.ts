import Operator from "../queries/prisma/Operator";
import ProductFilter from "../queries/prisma/product/ProductFilter";
import ProductSortOrder from "../queries/prisma/product/ProductSortOrder";

interface ProductGeneralListRequestDTO {
    filter: ProductFilter | Operator,
    sortOrder: ProductSortOrder
}

export default ProductGeneralListRequestDTO