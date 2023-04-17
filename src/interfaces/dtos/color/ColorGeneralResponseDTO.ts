import UserDetailDTO from "../user/UserDetailDTO";

interface ColorGeneralResponseDTO {
    id?: string;
    creator: UserDetailDTO | string;
    colorName: string;
    hexValue: string;
    description: string;
    isActive: boolean;
    deactivatedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default ColorGeneralResponseDTO