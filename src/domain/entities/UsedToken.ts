import User from "./User"

class UsedToken {
    private id?: string
    private user?: User
    private userEmail: string
    private usedRefreshToken: string
    private createdAt?: Date
    private updatedAt?: Date

    constructor(userEmail: string, usedRefreshToken: string) {
        this.userEmail = userEmail
        this.usedRefreshToken = usedRefreshToken
    }

    public getId(): string | undefined {
        return this.id
    }
    public getUser(): User | undefined {
        return this.user
    }
    public getUserEmail(): string {
        return this.userEmail
    }
    public getUsedRefreshToken(): string {
        return this.usedRefreshToken
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
    public setUser(user: User) {
        this.user= user
    }
    public setUserEmail(userEmail: string) {
        this.userEmail= userEmail
    }
    public setUsedRefreshToken(usedRefreshToken: string) {
        this.usedRefreshToken = usedRefreshToken
    }
    public setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }
    public setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
    }
}

export default UsedToken