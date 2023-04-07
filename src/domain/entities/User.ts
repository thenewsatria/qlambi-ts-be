import Role from "../enums/Role"
import Product from "./Product"
import Token from "./Token"
import UsedToken from "./UsedToken"

class User {
    private id?: string
    private email: string
    private username: string
    private password: string
    private role: Role
    private token?: Token
    private previousToken?: UsedToken
    private products?: Product[]
    private createdAt?: Date 
    private updatedAt?: Date

    constructor(email: string, username: string, password: string, role: Role = Role.USER) {
        this.email = email
        this.username = username
        this.password = password
        this.role = role
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
    getRole(): Role{
        return this.role
    }
    getToken(): Token | undefined {
        return this.token
    }
    getPreviousToken(): UsedToken | undefined {
        return this.previousToken
    }
    getProducts(): Product[] | undefined {
        return this.products
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
    setRole(role: Role) {
        this.role = role
    }
    setToken(token: Token) {
        this.token = token
    }
    setPreviousToken(previousToken: UsedToken) {
        this.previousToken = previousToken
    }
    setProducts(products: Product[]) {
        this.products = products
    }
    setCreatedAt(date: Date) {
        this.createdAt = date
    }
    setUpdatedAt(date: Date) {
        this.updatedAt = date
    }
}

export default User