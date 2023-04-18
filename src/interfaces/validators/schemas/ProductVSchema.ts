interface ProductVSchema {
    getAddProductRequestSchema(): any
    getUpdateProductRequestSchema(): any
    getProductByIdRequestSchema(): any
    getProductDeletionRequestSchema(): any
    getAddColorToProductRequestSchema(): any
    getRemoveColorFromProductRequestSchema(): any
}

export default ProductVSchema