import Size from "../../domain/entities/Size"

interface SizeRepository {
    createSize(size: Size): Promise<Size>
    updateSize(size: Size): Promise<Size>
    readById(sizeId: string, detailed: boolean): Promise<Size|null>
    updateActiveStatus(size: Size): Promise<Size>
}


export default SizeRepository