import User from "./User"

class Token {
    private id?: string
    private user?: User
    private userEmail: string
    private refreshToken: string
    private IP: string
    private userAgent: string
    private isBlocked: boolean
    private isInvalidated: boolean
    private createdAt?: Date 
    private updatedAt?: Date

    constructor(userEmail: string, refreshToken: string, IP: string, userAgent: string,
        isBlocked: boolean = false, isInvalidated: boolean = false) {

        this.userEmail = userEmail
        this.refreshToken = refreshToken
        this.IP = IP
        this.userAgent = userAgent
        this.isBlocked = isBlocked
        this.isInvalidated = isInvalidated
    }

    
    public getId(): string | undefined {
        return this.id
    }
    public getUser(): User | undefined{
        return this.user
    }
    public getUserEmail(): string {
        return this.userEmail
    }
    public getRefreshToken(): string {
        return this.refreshToken
    }
    public getIP(): string {
        return this.IP
    }
    public getUserAgent(): string {
        return this.userAgent
    }
    public getIsBlocked(): boolean {
        return this.isBlocked
    }
    public getIsInvalidated(): boolean {
        return this.isInvalidated
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
        this.user = user
    }
    public setUserEmail(userEmail: string) {
        this.userEmail= userEmail
    }
    public setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken
    }
    public setIP(IP: string) {
        this.IP = IP
    }
    public setUserAgent(userAgent: string) {
        this.userAgent = userAgent
    }
    public setIsBlocked(isBlocked: boolean) {
        this.isBlocked = isBlocked
    }
    public setIsInvalidated(isInvalidated: boolean) {
        this.isInvalidated = isInvalidated
    }
    public setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }
    public setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
    }

}

export default Token