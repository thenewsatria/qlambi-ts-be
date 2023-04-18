import Size from "../../domain/entities/Size"

interface SizeRepository {
    createSize(size: Size): Promise<Size>
}

export default SizeRepository