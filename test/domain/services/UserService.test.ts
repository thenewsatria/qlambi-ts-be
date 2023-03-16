import { boolean } from 'zod'
import DatabaseError from '../../../src/application/errors/databases/DatabaseError'
import User from '../../../src/domain/entities/User'
import UserService from '../../../src/domain/services/UserService'
import UserRepositoryPrisma from '../../../src/infrastructure/repositories/prisma/UserRepositoryPrisma'
import DatabaseOperation from '../../../src/interfaces/enums/DatabaseOperationType'

describe('UserService', () => {
    const userRepo = new UserRepositoryPrisma()
    const userService = new UserService(userRepo)
    describe('insertUser method', () => {
        it("Should return back user if repository successfully inserting user", async() => {
            const insertUserSpy = jest.spyOn(userService, 'insertUser')
            jest.spyOn(userRepo, 'createUser').mockImplementation((user: User): Promise<User> => {
                return Promise.resolve(user)
            })
            const user = new User("testemail1@test.com", "testusername1", "testpassword1")

            const newUser = await userService.insertUser({
                username: user.getUsername(),
                email: user.getEmail(),
                password: user.getPassword(),
                confirmPassword: user.getPassword()
            })

            expect(insertUserSpy).toBeCalledWith({
                username: "testusername1",
                email: "testemail1@test.com",
                password: "testpassword1",
                confirmPassword: "testpassword1"
            })
            expect(insertUserSpy).toReturnWith(Promise.resolve(user))
            expect(newUser).toBeInstanceOf(User)
            expect(user).toEqual(newUser)  
        })


        it("Should throw error if user repository failing inserting user", async() => {
            const insertUserSpy = jest.spyOn(userService, 'insertUser')
            const dbError = new DatabaseError("123", true, DatabaseOperation.CREATE)
            jest.spyOn(userRepo, 'createUser').mockImplementation((user: User): Promise<User> => {
                return Promise.reject(dbError)
            })
            const user = new User("testemail1@test.com", "testusername1", "testpassword1")

            try{
                const newUser = await userService.insertUser({
                    username: user.getUsername(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    confirmPassword: user.getPassword()
                })

                expect(insertUserSpy).toBeCalledWith({
                    username: "testusername1",
                    email: "testemail1@test.com",
                    password: "testpassword1",
                    confirmPassword: "testpassword1"
                })

                expect(insertUserSpy).toThrow(dbError)
            }catch(err: any) {
                expect(err).toBeInstanceOf(Error)
                expect(err).toBeInstanceOf(DatabaseError)
            }

        })
    })

    describe('isEmailAvailable method', () => {
        it("Should return true is email is exist", async() => {
            const isEmailExistSpy = jest.spyOn(userService, 'isEmailExist')
            jest.spyOn(userRepo, 'readByEmail').mockImplementation((email: string): Promise<User|null> => {
                return Promise.resolve(new User("testemail1@test.com", "testusername1", "testpassword1"))
            })

            const condition = await userService.isEmailExist({email: ""})
            expect(condition).toBeTruthy()
            expect(typeof condition).toBe('boolean')

            expect(isEmailExistSpy).toBeCalledWith({email: ""})
            expect(isEmailExistSpy).toReturnWith(Promise.resolve(true))
        })

        it("Should return false if email is not used by user", async() => {
            const isEmailExistSpy = jest.spyOn(userService, 'isEmailExist')
            jest.spyOn(userRepo, 'readByEmail').mockImplementation((email: string): Promise<User|null> => {
                return Promise.resolve(null)
            })

            const condition = await userService.isEmailExist({email: ""})
            expect(condition).toBeFalsy()
            expect(typeof condition).toBe('boolean')

            expect(isEmailExistSpy).toBeCalledWith({email: ""})
            expect(isEmailExistSpy).toReturnWith(Promise.resolve(false))
        })
    })

    describe('isUsernameAvailable method', () => {
        it("Should return true is username is exist", async() => {
            const isUsenameExistSpy = jest.spyOn(userService, 'isUsernameExist')
            jest.spyOn(userRepo, 'readByUsername').mockImplementation((username: string): Promise<User|null> => {
                return Promise.resolve(new User("testemail1@test.com", "testusername1", "testpassword1"))
            })

            const condition = await userService.isUsernameExist({username: ""})
            expect(condition).toBeTruthy()
            expect(typeof condition).toBe('boolean')

            expect(isUsenameExistSpy).toBeCalledWith({username: ""})
            expect(isUsenameExistSpy).toReturnWith(Promise.resolve(true))
        })

        it("Should return false if username is not used by user", async() => {
            const isUsenameExistSpy = jest.spyOn(userService, 'isUsernameExist')
            jest.spyOn(userRepo, 'readByUsername').mockImplementation((email: string): Promise<User|null> => {
                return Promise.resolve(null)
            })

            const condition = await userService.isUsernameExist({username: ""})
            expect(condition).toBeFalsy()
            expect(typeof condition).toBe('boolean')

            expect(isUsenameExistSpy).toBeCalledWith({username: ""})
            expect(isUsenameExistSpy).toReturnWith(Promise.resolve(false))
        })
    })
 })