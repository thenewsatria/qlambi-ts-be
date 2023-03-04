import User from '../../../src/enterprises/models/User'

describe('User Model', () => {
    const user = new User('username', 'email', 'password')
    
    it('Should have username, email and password property', () => {
        expect(user).toHaveProperty('username')
        expect(user).toHaveProperty('email')
        expect(user).toHaveProperty('password')  
    })
    it("Should have correct type of property", () => {
        expect(typeof user.username).toBe("string")
        expect(typeof user.email).toBe("string")
        expect(typeof user.password).toBe("string")
    })
    it("Should have the correct assigned value", () => {
        expect(user.username).toBe("username")
        expect(user.email).toBe("email")
        expect(user.password).toBe("password")
    })
 })