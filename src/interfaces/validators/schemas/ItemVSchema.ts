interface ItemVSchema {
    getCreateItemRequestSchema(): any
    getItemByIdRequestSchema(): any
    getItemDeletionRequestSchema(): any
    getUpdateItemRequestSchema(): any
    getUploadItemImageRequestSchema(): any
}

export default ItemVSchema