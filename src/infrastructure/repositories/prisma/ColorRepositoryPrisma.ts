import Color from "../../../domain/entities/Color";
import ColorRepository from "../../../interfaces/repositories/ColorRepository";
import prismaClient from "../../databases/prisma/client";

class ColorRepositoryPrisma implements ColorRepository {
    private readonly _client = prismaClient
    private static instance: ColorRepositoryPrisma
    
    public static getInstance() {
        if(!ColorRepositoryPrisma.instance) {
            ColorRepositoryPrisma.instance = new ColorRepositoryPrisma()
        }
        
        return ColorRepositoryPrisma.instance
    }
    async createColor(color: Color): Promise<Color> {
        const newColor = await this._client.color.create({
            data: {
                colorName: color.getColorName(),
                hexValue: color.getHexValue(),
                description: color.getDescription(),
                userEmail: color.getUserEmail(),
            }
        })
        color.setId(newColor.id+"")
        color.setCreatedAt(newColor.createdAt)
        color.setUpdatedAt(newColor.updatedAt)
        return Promise.resolve(color)
    }
}

export default ColorRepositoryPrisma