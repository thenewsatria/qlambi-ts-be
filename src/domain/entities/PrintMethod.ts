import User from "./User"

class PrintMethod {
    private id?: string
    private printMethodName: string
    private description: string
    private creator?: User
    private userEmail: string
    private isActive: boolean
    private deactivatedAt?: Date
    private createdAt?: Date
    private updatedAt?: Date
    
    constructor(userEmail: string, printMethodName: string, description: string = ""){
        this.userEmail = userEmail
        this.printMethodName = printMethodName
        this.description = description

        this.isActive = true
    }

    public getId(): string | undefined {
        return this.id
    }

    public getPrintMethodName(): string {
        return this.printMethodName
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

    
    public setId(id: string): void {
        this.id = id
    }

    public setPrintMethodName(printMethodName: string): void {
        this.printMethodName = printMethodName
    }

    public setDescription(description: string): void {
        this.description = description
    }

    public setCreator(creator: User): void {
        this.creator = creator
    }

    public setUserEmail(userEmail: string): void {
        this.userEmail = userEmail
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive
    }

    public setDeactivatedAt(deactivatedAt: Date): void {
        this.deactivatedAt = deactivatedAt
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt
    }
}

export default PrintMethod