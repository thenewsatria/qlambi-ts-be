import Token from "./Token"
import UsedToken from "./UsedToken"

class User {
//     id            Int       @id @default(autoincrement())
//   email         String    @unique
//   username      String    @unique
//   password      String
//   token         Token?
//   previousToken UsedToken?
//   createdAt     DateTime  @default(now())
//   updatedAt     DateTime  @updatedAt
    private id?: string
    private email: string
    private username: string
    private password: string
    private token?: Token
    private previousToken?: UsedToken
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
    getEmail(): string {
        return this.email
    }
    getUsername(): string{
        return this.username
    }
    getPassword(): string{
        return this.password
    }
    getToken(): Token | undefined {
        return this.token
    }
    getPreviousToken(): UsedToken | undefined {
        return this.previousToken
    }
    getCreatedAt(): Date | undefined{
        return this.createdAt
    }
    getUpdatedAt(): Date | undefined{
        return this.updatedAt
    }

    setId(id: string) {
        this.id = id
    }
    setEmail(email: string) {
        this.email = email
    }
    setUsername(username: string) {
        this.username = username
    }
    setPassword(password: string) {
        this.password = password
    }
    setToken(token: Token) {
        this.token = token
    }
    setPreviousToken(previousToken: UsedToken) {
        this.previousToken = previousToken
    }
    setCreatedAt(date: Date) {
        this.createdAt = date
    }
    setUpdatedAt(date: Date) {
        this.updatedAt = date
    }
}

export default User