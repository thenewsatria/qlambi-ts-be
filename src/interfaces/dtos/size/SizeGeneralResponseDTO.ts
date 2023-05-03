import ProductGeneralResponseDTO from "../product/ProductGeneralResponse";
import UserDetailDTO from "../user/UserDetailDTO";

interface SizeGeneralResponseDTO {
    id?: string;
    sizeName: string;
    sizeCategory: string;
    length: number;
    width: number;
    description: string;
    creator?: UserDetailDTO | string;
    product?: ProductGeneralResponseDTO | string;
    isActive: boolean;
    deactivatedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default SizeGeneralResponseDTO