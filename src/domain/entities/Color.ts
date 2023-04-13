import User from "./User"

class Color {
    private id?: string            
    private colorName: string     
    private hexValue: string    
    private description: string   
    private creator? : User      
    private userEmail: string      
    private isActive: boolean      
    private deactivatedAt?: Date
    private createdAt?: Date    
    private updatedAt?: Date
    
    constructor(userEmail: string, colorName: string, hexValue: string, description: string = "") {
        this.userEmail = userEmail
        this.colorName = colorName
        this.hexValue = hexValue
        this.description = description
        this.isActive = true
    }

    public setId(id: string) {
        this.id = id
    }

    public setColorName(colorName: string) {
        this.colorName = colorName
    }

    public setHexValue(hexValue: string) {
        this.hexValue = hexValue
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

    public setIsActive(isActive: boolean) {
        this.isActive = isActive
    }
    
    public setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }

    public setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
    }

    public setDeactivatedAt(deactivatedAt: Date) {
        this.deactivatedAt = deactivatedAt
    }

    public getId(): string | undefined {
        return this.id
    }
    
    public getColorName(): string {
        return this.colorName
    }
    
    public getHexValue(): string {
        return this.hexValue
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

    public getCreatedAt(): Date | undefined {
        return this.createdAt
    }

    public getUpdatedAt(): Date | undefined {
        return this.updatedAt
    }

    public getDeactivatedAt(): Date | undefined {
        return this.deactivatedAt
    }
}

export default Color