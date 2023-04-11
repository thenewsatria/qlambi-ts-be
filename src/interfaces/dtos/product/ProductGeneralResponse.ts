import UserDetailDTO from "../user/UserDetailDTO";

interface ProductGeneralResponseDTO {
    id?: string;
    creator: UserDetailDTO | string;
    productName: string;
    productClass: string;
    productType: string;
    material: string;
    description: string;
    isActive: boolean;
    deactivatedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default ProductGeneralResponseDTO

