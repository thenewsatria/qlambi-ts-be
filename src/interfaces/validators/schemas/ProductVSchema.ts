interface ProductVSchema {
    getAddProductRequestSchema(): any
    getUpdateProductRequestSchema(): any
    getProductByIdRequestSchema(): any
    getProductDeletionRequestSchema(): any
    getAddColorToProductRequestSchema(): any
    getAddSizeToProductRequestSchema(): any
    getRemoveColorFromProductRequestSchema(): any
}

export default ProductVSchema