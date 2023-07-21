interface ItemCreationRequestDTO {
    itemCode: string;
    itemName: string;
    productId: string;
    colorId: string;
    sizeId: string;
    price: number;
    itemImage: string;
    stock: number;
    description: string;
    userEmail: string;
}

export default ItemCreationRequestDTO;