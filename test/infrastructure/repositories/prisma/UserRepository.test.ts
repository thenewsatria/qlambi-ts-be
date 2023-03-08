import UserRepository from "../../../../src/interfaces/repositories/UserRepository"
import UserRepositoryPrisma from "../../../../src/infrastructure/repositories/prisma/UserRepositoryPrisma"

describe('User Repository Prisma Implementation', () => {
    const userRepository = UserRepositoryPrisma.getInstance()

    it("Should implement singleton pattern, have same instance as previous instace declared", () => {
        const localUserRepos = UserRepositoryPrisma.getInstance()
        expect(localUserRepos).toBeInstanceOf(UserRepositoryPrisma)
        expect(localUserRepos === userRepository).toBe(true)
        expect(localUserRepos === new UserRepositoryPrisma()).toBe(false)
        expect(userRepository === new UserRepositoryPrisma()).toBe(false)
    })

    it("Should called method getInstance correctly", () => {
        const getInstanceSpy = jest.spyOn(UserRepositoryPrisma, 'getInstance')
        const localUserRepo = UserRepositoryPrisma.getInstance()
        expect(getInstanceSpy).toReturnWith(localUserRepo)
        expect(getInstanceSpy).toReturnWith(UserRepositoryPrisma.getInstance())
        expect(getInstanceSpy).toBeCalledTimes(2)
        expect(getInstanceSpy).toBeCalledWith()
    })

    it("Should have implemented User Repository interface", () => {
        expect(userRepository as UserRepository).toBeTruthy()
        expect(userRepository as UserRepository).toHaveProperty('createUser')
    })
 })