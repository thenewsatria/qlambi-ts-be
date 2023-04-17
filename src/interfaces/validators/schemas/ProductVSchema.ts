interface ProductVSchema {
    getAddProductRequestSchema(): any
    getUpdateProductRequestSchema(): any
    getProductByIdRequestSchema(): any
    getProductDeletionRequestSchema(): any
    getAddColorToProductRequestSchema(): any
}

export default ProductVSchema