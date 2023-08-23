interface ItemCreationRequestDTO {
    itemCode: string;
    itemName: string;
    productId: string; //should it be here? probably need some validation
    colorId: string; //should it be here? probably need some validation
    sizeId: string; //should it be here?, probably need some validation
    price: number;
    itemImages: string[]; //should it be here?
    stock: number;
    description: string;
    userEmail: string;
}

export default ItemCreationRequestDTO;