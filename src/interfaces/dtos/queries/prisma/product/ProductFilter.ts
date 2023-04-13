import SearchQuery from "../SearchQuery"

interface ProductFilter {
    productClass?: SearchQuery
    productName?: SearchQuery
    productType?: SearchQuery
    material?: SearchQuery
    description?: SearchQuery
    isActive?: boolean
}

export default ProductFilter