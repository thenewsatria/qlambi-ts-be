import Color from "../../domain/entities/Color";

interface ColorRepository {
    createColor(color: Color): Promise<Color>
}

export default ColorRepository