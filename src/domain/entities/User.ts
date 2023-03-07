class User {
    private id?: string
    private email: string
    private username: string
    private password: string
    private createdAt?: Date 
    private updatedAt?: Date

    constructor(email: string, username: string, password: string) {
        this.email = email
        this.username = username
        this.password = password
    }

    getId(): string | undefined{
        return this.id
    }

    setId(id: string) {
        this.id = id
    }

    getEmail(): string {
        return this.email
    }

    setEmail(email: string) {
        this.email = email
    }

    getUsername(): string{
        return this.username
    }

    setUsername(username: string) {
        this.username = username
    }

    getPassword(): string{
        return this.password
    }

    setPassword(password: string) {
        this.password = password
    }

    getCreatedAt(): Date | undefined{
        return this.createdAt
    }

    setCreatedAt(date: Date) {
        this.createdAt = date
    }

    getUpdatedAt(): Date | undefined{
        return this.updatedAt
    }

    setUpdatedAt(date: Date) {
        this.updatedAt = date
    }

    updated() {
        this.updatedAt = new Date()
    }
}

export default User