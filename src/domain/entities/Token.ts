class Token {
    private id?: string
    private email: string
    private refreshToken: string
    private IP: string
    private userAgent: string
    private isBlocked: boolean
    private createdAt?: Date 
    private updatedAt?: Date

    constructor(email: string, refreshToken: string,  IP: string, userAgent: string, isBlocked: boolean = false) {
        this.email = email
        this.refreshToken = refreshToken
        this.IP = IP
        this.userAgent = userAgent
        this.isBlocked = isBlocked
    }

    
    public getId(): string | undefined {
        return this.id
    }
    public getEmail(): string {
        return this.email
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
    public getCreatedAt(): Date | undefined {
        return this.createdAt
    }
    public getUpdatedAt(): Date | undefined {
        return this.updatedAt
    }



    public setId(id: string) {
        this.id = id
    }
    public setEmail(email: string) {
        this.email= this.email
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
    public setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }
    public setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
    }

}

export default Token