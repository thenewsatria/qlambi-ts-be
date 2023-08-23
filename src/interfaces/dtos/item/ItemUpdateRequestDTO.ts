interface ItemUpdateRequestDTO {
    id: string;
    itemCode: string;
    itemName: string;
    productId: string;
    colorId: string;
    sizeId: string;
    price: number;
    stock: number;
    description: string;
}

export default ItemUpdateRequestDTO