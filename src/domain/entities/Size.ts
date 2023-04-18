import Product from "./Product"
import User from "./User"

class Size {
    private id?: string
    private sizeName: string
    private sizeCategory: string
    private length: number
    private width: number
    private description: string
    private creator?: User
    private userEmail: string
    private product?: Product
    private productId: string
    private isActive: boolean
    private deactivatedAt?: Date
    private createdAt?: Date
    private updatedAt?: Date

    constructor(userEmail: string, productId: string, sizeName: string, sizeCategory: string, 
        length: number, width: number, description: string = "") {

        this.userEmail = userEmail
        this.sizeName = sizeName
        this.sizeCategory = sizeCategory
        this.length = length
        this.width = width
        this.description = description
        this.productId = productId
        this.isActive = true
    }

    public getId(): string | undefined {
        return this.id
    }

    public getSizeName(): string {
        return this.sizeName
    }

    public getSizeCategory(): string {
        return this.sizeCategory
    }

    public getLength(): number {
        return this.length
    }

    public getWidth(): number {
        return this.width
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

    public getProduct(): Product | undefined {
        return this.product
    }

    public getProductId(): string {
        return this.productId
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

    public setSizeName(sizeName: string) {
        this.sizeName = sizeName
    }

    public setSizeCategory(sizeCategory: string) {
        this.sizeCategory = sizeCategory
    }

    public setLength(length: number) {
        this.length = length
    }

    public setWidth(width: number) {
        this.width = width
    }

    public setDescription(description: string) {
        this.description = description
    }

    public setCreator(creator: User) {
        this.creator = creator
    }

    public setUserEmail(userEmail: string) {
        this.userEmail = userEmail
    }

    public setProduct(product: Product) {
        this.product = product
    }

    public setProductId(productId: string) {
        this.productId = productId
    }

    public setActive(isActive: boolean) {
        this.isActive = isActive
    }

    public setDeactivatedAt(deacitvatedAt: Date) {
        this.deactivatedAt = deacitvatedAt
    }

    public setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }
    
    public setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
    }
}

export default Size