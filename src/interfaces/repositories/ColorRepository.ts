import Color from "../../domain/entities/Color";

interface ColorRepository {
    createColor(color: Color): Promise<Color>
    readById(colorId: string, detailed: boolean): Promise<Color|null>
    updateColor(color: Color): Promise<Color>
    updateActiveStatus(color: Color): Promise<Color>
    deleteColor(color: Color, detailed: boolean): Promise<Color>
    readAllwSearch(query: any, detailed: boolean): Promise<Color[]>
}

export default ColorRepository