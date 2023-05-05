import Size from "./Size"
import Color from "./Color"
import User from "./User"

class Product {
    private id?: string
    private productName: string
    private productClass: string
    private productType: string
    private material: string
    private description: string
    private availableColors?: Color[]
    private availableSizes?: Size[]
    private creator?: User
    private userEmail: string
    private isActive: boolean
    private deactivatedAt?: Date
    private createdAt?: Date 
    private updatedAt?: Date

    constructor(userEmail: string, productName: string, productClass: string, productType: string, material: string, description: string = "") {
        this.userEmail = userEmail
        this.productName = productName
        this.productClass = productClass
        this.productType = productType
        this.material = material
        this.description = description
        this.isActive = true
    }

    public getId(): string | undefined {
        return this.id
    }

    public getProductName(): string {
        return this.productName
    }

    public getProductClass(): string {
        return this.productClass
    }

    public getProductType(): string {
        return this.productType
    }
    
    public getMaterial(): string {
        return this.material
    }

    public getAvailableColors(): Color[] | undefined {
        return this.availableColors
    }

    public getAvailableSizes(): Size[] | undefined {
        return this.availableSizes
    }

    public getDescription(): string {
        return this.description
    }

    public getCreator(): User | undefined {
        return this.creator
    }

    public getUserEmail(): string {
        return this.userEmail
    }

    public getIsActive(): boolean {
        return this.isActive
    }
    
    public getDeactivatedAt(): Date | undefined {
        return this.deactivatedAt
    }

    public getCreatedAt(): Date | undefined {
        return this.createdAt
    }

    public getUpdatedAt(): Date | undefined {
        return this.updatedAt
    }



    public setId(id: string) {
        this.id = id
    }

    public setProductName(productName: string) {
        this.productName = productName
    }

    public setProductClass(productClass: string) {
        this.productClass = productClass
    }

    public setProductType(productType: string) {
        this.productType = productType
    }

    public setMaterial(material: string) {
        this.material = material
    }

    public setDescription(description: string) {
        this.description = description
    }

    public setAvailableColors(availableColors: Color[]) {
        this.availableColors = availableColors
    }

    public setAvailableSizes(availableSizes: Size[]) {
        this.availableSizes = availableSizes
    }

    public setCreator(creator: User) {
        this.creator = creator
    }

    public setUserEmail(userEmail: string) {
        this.userEmail = userEmail
    }

    public setIsActive(isActive: boolean) {
        this.isActive = isActive
    }
    
    public setDeactivatedAt(deactivatedAt: Date) {
        this.deactivatedAt = deactivatedAt
    }
    
    public setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }

    public setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
    }
}

export default Product