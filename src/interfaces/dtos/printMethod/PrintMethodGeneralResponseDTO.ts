import UserDetailDTO from "../user/UserDetailDTO"

interface PrintMethodGeneralResponseDTO {
    id?: string,
    printMethodName: string,
    description: string,
    creator?: UserDetailDTO | string,
    isActive: boolean,
    deactivatedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
}

export default PrintMethodGeneralResponseDTO