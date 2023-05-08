import Color from "../../../domain/entities/Color";
import User from "../../../domain/entities/User";
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

    async updateColor(color: Color): Promise<Color> {
        const updatedColor = await this._client.color.update({
            where: {
                id: +color.getId()!
            },
            data: {
                colorName: color.getColorName(),
                hexValue: color.getHexValue(),
                description: color.getDescription(),
            }
        })
        
        color.setUpdatedAt(updatedColor.updatedAt)
        return Promise.resolve(color)
    }

    async readAllwSearch(query: any, detailed: boolean): Promise<Color[]> {
        const colors: Color[] = []
        const colorRes = await this._client.color.findMany({
            where: query.filter as any,
            orderBy: query.sortOrder as any,
            include: {
                creator: detailed
            }
        })
        for (const currColor of colorRes) {
            const color = new Color(currColor.userEmail, currColor.colorName, currColor.hexValue, currColor.description)
            color.setId(currColor.id+"")
            color.setIsActive(currColor.isActive)
            currColor.deactivatedAt ? color.setDeactivatedAt(currColor.deactivatedAt) : null
            currColor.creator ? 
            color.setCreator(new User(currColor.creator.email, currColor.creator.username, "")) 
                : null
                color.setCreatedAt(currColor.createdAt)
                color.setUpdatedAt(currColor.updatedAt)
            colors.push(color)
        }

        return Promise.resolve(colors)
    }

    async readById(colorId: string, detailed: boolean): Promise<Color | null> {
        let color: Color | null = null

        const colorResult = await this._client.color.findUnique({
            where: {
                id: +colorId
            },
            include: {
                creator: detailed
            }
        })

        if(colorResult) {
            color = new Color(colorResult.userEmail, colorResult.colorName,
                colorResult.hexValue, colorResult.description)
            color.setId(colorResult.id+"")
            color.setIsActive(colorResult.isActive)
            colorResult.deactivatedAt ? color.setDeactivatedAt(colorResult.deactivatedAt) : null
            colorResult.creator ? 
                color.setCreator(new User(colorResult.creator.email, colorResult.creator.username, ""))
                : 
                null
            color.setCreatedAt(colorResult.createdAt)
            color.setUpdatedAt(colorResult.updatedAt)
        }

        return Promise.resolve(color)
    }

    async updateActiveStatus(color: Color): Promise<Color> {
        const now = new Date()
        const updatedColor = await this._client.color.update({
            where: {
                id: +color.getId()!
            },
            data: {
                isActive: color.getIsActive(),

                // update only when its deactivated
                deactivatedAt: !color.getIsActive() ? now : color.getDeactivatedAt()
            }
        })
        color.setDeactivatedAt(updatedColor.deactivatedAt!)
        color.setUpdatedAt(updatedColor.updatedAt)
        return Promise.resolve(color) 
    }

    async deleteColor(color: Color, detailed: boolean): Promise<Color> {
        const deletedColor = await this._client.color.delete({
            where: {
                id: +color.getId()!
            },
            include: {
                creator: detailed
            }
        })
        if(deletedColor){
            color = new Color(deletedColor.userEmail, deletedColor.colorName, deletedColor.hexValue, deletedColor.description)
            color.setId(deletedColor.id+"")
            color.setIsActive(deletedColor.isActive)
            deletedColor.deactivatedAt ? color.setDeactivatedAt(deletedColor.deactivatedAt) : null
            deletedColor.creator ? 
                color.setCreator(new User(deletedColor.creator.email, deletedColor.creator.username, "")) 
                : 
                null
            color.setCreatedAt(deletedColor.createdAt)
            color.setUpdatedAt(deletedColor.updatedAt)
        }

        return Promise.resolve(color)
    }
}

export default ColorRepositoryPrisma