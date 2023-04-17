import ColorGeneralResponseDTO from "../color/ColorGeneralResponseDTO";
import UserDetailDTO from "../user/UserDetailDTO";

interface ProductGeneralResponseDTO {
    id?: string;
    creator: UserDetailDTO | string;
    productName: string;
    productClass: string;
    productType: string;
    material: string;
    description: string;
    availableColors?: ColorGeneralResponseDTO[] | string[] 
    isActive: boolean;
    deactivatedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default ProductGeneralResponseDTO

