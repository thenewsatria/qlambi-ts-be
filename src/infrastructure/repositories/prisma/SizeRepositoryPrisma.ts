
import Size from "../../../domain/entities/Size";
import SizeRepository from "../../../interfaces/repositories/SizeRepository";
import prismaClient from "../../databases/prisma/client";

class SizeRepositoryPrisma implements SizeRepository {
    private readonly _client = prismaClient
    private static instance: SizeRepositoryPrisma
    
    public static getInstance() {
        if(!SizeRepositoryPrisma.instance) {
            SizeRepositoryPrisma.instance = new SizeRepositoryPrisma()
        }
        
        return SizeRepositoryPrisma.instance
    }

    async createSize(size: Size): Promise<Size> {
        const newSize = await this._client.size.create({
            data: {
                sizeName: size.getSizeName(),
                sizeCategory: size.getSizeCategory(),
                length: size.getLength(),
                width: size.getWidth(),
                description: size.getDescription(),
                userEmail: size.getUserEmail(),
                productId: +size.getProductId()
            }
        })

        size.setId(newSize.id+"")
        size.setCreatedAt(newSize.createdAt)
        size.setUpdatedAt(newSize.updatedAt) 
        return Promise.resolve(size)
    }
}

export default SizeRepositoryPrisma