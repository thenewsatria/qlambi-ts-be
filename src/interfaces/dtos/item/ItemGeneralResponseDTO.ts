import ColorGeneralResponseDTO from "../color/ColorGeneralResponseDTO";
import ProductGeneralResponseDTO from "../product/ProductGeneralResponse";
import SizeGeneralResponseDTO from "../size/SizeGeneralResponseDTO";
import UserDetailDTO from "../user/UserDetailDTO";

interface ItemGeneralResponseDTO {
    id?: string;
    itemCode: string;
    itemName: string;
    product?: ProductGeneralResponseDTO | string;
    color?: ColorGeneralResponseDTO | string;
    size?: SizeGeneralResponseDTO | string;
    price: number;
    itemImages: string[];
    stock: number;
    description: string;
    creator?: UserDetailDTO | string;
    isActive: boolean;
    deactivatedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default ItemGeneralResponseDTO;