interface ItemCreationRequestDTO {
    itemCode: string;
    itemName: string;
    productId: string; 
    colorId: string;
    sizeId: string;
    price: number;
    itemImages: string[];
    stock: number;
    description: string;
    userEmail: string;
}

export default ItemCreationRequestDTO;