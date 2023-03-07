import User from '../../../src/domain/entities/User'

describe('User entities', () => {
    const user = new User('email', 'username', 'password')
    const testDate = new Date("2022-03-25")
    it("User entities getter method must be functioning correctly", () => {
        expect(user.getId()).toBeUndefined()
        expect(user.getCreatedAt()).toBeUndefined()
        expect(user.getUpdatedAt()).toBeUndefined()
        expect(user.getEmail()).toBe('email')
        expect(user.getUsername()).toBe('username')
        expect(user.getPassword()).toBe('password')
    })

    it("User entities setter method must be functioning correctly", () => {
        const setIdSpy = jest.spyOn(user, 'setId')
        user.setId("1")
        expect(setIdSpy).toBeCalledWith("1")
        expect(user.getId()).toBe("1")

        const setCreatedAt = jest.spyOn(user, 'setCreatedAt')
        user.setCreatedAt(testDate)
        expect(setCreatedAt).toBeCalledWith(new Date("2022-03-25"))
        expect(user.getCreatedAt()).toEqual(new Date("2022-03-25"))

        const setUpdatedAt = jest.spyOn(user, 'setUpdatedAt')
        user.setUpdatedAt(testDate)
        expect(setUpdatedAt).toBeCalledWith(new Date("2022-03-25"))
        expect(user.getUpdatedAt()).toEqual(new Date("2022-03-25"))

        const setEmail = jest.spyOn(user, 'setEmail')
        user.setEmail("test")
        expect(setEmail).toBeCalledWith("test")
        expect(user.getEmail()).toBe("test")

        const setUsername = jest.spyOn(user, 'setUsername')
        user.setUsername("test")
        expect(setUsername).toBeCalledWith("test")
        expect(user.getUsername()).toBe("test")
        
        const setPassword = jest.spyOn(user, 'setPassword')
        user.setPassword("test")
        expect(setPassword).toBeCalledWith("test")
        expect(user.getPassword()).toBe("test")
    })

    it("User entities must have all the important properties", () => {
        expect(user).toHaveProperty('id', '1')
        expect(user).toHaveProperty('email', 'test')
        expect(user).toHaveProperty('username', 'test')
        expect(user).toHaveProperty('password', 'test')
        expect(user).toHaveProperty('createdAt')
        expect(user).toHaveProperty('updatedAt')
    })

    it("User entities updated method must be functioning correctly", () => {
        const updatedAtSpy = jest.spyOn(user, 'updated')
        expect(user.getUpdatedAt()?.getTime()).toEqual(new Date("2022-03-25").getTime())

        user.updated()
        expect(updatedAtSpy).toBeCalled()
        expect(user.getUpdatedAt()?.getTime()).toBeGreaterThan(new Date("2022-03-25").getTime())
        // expect(user.getUpdatedAt()?.getTime() > new Date("2022-03-25")).toBe(true)
    })
 })