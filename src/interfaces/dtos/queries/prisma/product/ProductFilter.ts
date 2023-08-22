import StringQuery from "../StringQuery"

interface ProductFilter {
    productClass?: StringQuery
    productName?: StringQuery
    productType?: StringQuery
    material?: StringQuery
    description?: StringQuery
    isActive?: boolean
}

export default ProductFilter