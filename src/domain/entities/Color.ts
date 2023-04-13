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

    setId(id: string) {
        this.id = id
    }

    setColorName(colorName: string) {
        this.colorName = colorName
    }

    setHexValue(hexValue: string) {
        this.hexValue = hexValue
    }

    setDescription(description: string) {
        this.description = description
    }
    
    setCreator(creator: User) {
        this.creator = creator
    }

    setUserEmail(userEmail: string) {
        this.userEmail = userEmail
    }

    setIsActive(isActive: boolean) {
        this.isActive = isActive
    }
    
    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }

    setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
    }

    setDeactivatedAt(deactivatedAt: Date) {
        this.deactivatedAt = deactivatedAt
    }

    getId(): string | undefined {
        return this.id
    }
    
    getColorName(): string {
        return this.colorName
    }
    
    getHexValue(): string {
        return this.hexValue
    }
    
    getDescription(): string {
        return this.description
    }
    
    getCreator(): User | undefined {
        return this.creator
    }
    
    getUserEmail(): string {
        return this.userEmail
    }
    
    getIsActive(): boolean {
        return this.isActive
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt
    }

    getDeactivatedAt(): Date | undefined {
        return this.deactivatedAt
    }
}

export default Color