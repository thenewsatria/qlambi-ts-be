import UserRepository from "../../../../src/interfaces/repositories/UserRepository"
import UserRepositoryPrisma from "../../../../src/infrastructure/repositories/prisma/UserRepositoryPrisma"
import {deleteAllUser, insertUser} from '../../../../src/infrastructure/databases/prisma/helper'
import User from "../../../../src/domain/entities/User"
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import DatabaseError from "../../../../src/application/errors/databases/DatabaseError"
import BaseError from "../../../../src/application/errors/BaseError"
import DatabaseOperation from "../../../../src/interfaces/enums/DatabaseOperationType"

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

    describe('createUser method', () => {
        it("Should function correctly when the input is correct", async() => {
            const newUser = new User("email", "username", "password")
            const createUserSpy = jest.spyOn(userRepository, "createUser")
            const insertedUser = await userRepository.createUser(newUser)
            expect(createUserSpy).toBeCalledWith(newUser)
            expect(createUserSpy).toReturnWith(Promise.resolve(newUser))
            expect(newUser === insertedUser).toBe(true)
            expect(insertedUser.getId()).not.toBeUndefined()
            expect(insertedUser.getCreatedAt()).not.toBeUndefined()
            expect(insertedUser.getUpdatedAt()).not.toBeUndefined()


            await deleteAllUser()
        })
        it("Should handle PrismaClientKnownRequestError correctly", async() => {
            const createUserSpy = jest.spyOn(userRepository, "createUser")
            createUserSpy.mockImplementation((user: User) => {
                try{
                    throw new PrismaClientKnownRequestError("test", {code: "P0001", clientVersion: "testClientVer"})
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.CREATE, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.createUser({} as User)
            }catch(error: any){
                if (error instanceof Error) {
                    if (error.name.includes('Prisma')){
                        expect(error).toBeInstanceOf(DatabaseError)
                        expect(error.message).toBe("test")
                        expect((error as DatabaseError).isOperational).toBe(true)
                        expect((error as DatabaseError).operation).toBe("CREATE")
                        expect((error as DatabaseError).payload).toEqual(
                            new PrismaClientKnownRequestError("test", {code: "P0001", clientVersion: "testClientVer"})
                        )
                    }
                }
            }
        })
        it("Should handle other prisma error correctly", async() => {
            const createUserSpy = jest.spyOn(userRepository, "createUser")
            createUserSpy.mockImplementation((user: User) => {
                try{
                    throw new PrismaClientInitializationError("test2", "test2")
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.CREATE, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.createUser({} as User)
            }catch(error: any){
                if (error instanceof Error) {
                    if (error.name.includes('Prisma')){
                        expect(error).toBeInstanceOf(DatabaseError)
                        expect(error.message).toBe("test")
                        expect((error as DatabaseError).isOperational).toBe(true)
                        expect((error as DatabaseError).operation).toBe("CREATE")
                        expect((error as DatabaseError).payload).toEqual(new PrismaClientInitializationError("test2", "test2"))
                    }
                }
            }
        })
        it("Should handle other error correctly", async() => {
            const createUserSpy = jest.spyOn(userRepository, "createUser")
            createUserSpy.mockImplementation((user: User) => {
                try{
                    throw new Error("test3")
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.CREATE, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.createUser({} as User)
            }catch(error: any){
                if (error instanceof Error) {
                    expect(error).toBeInstanceOf(BaseError)
                    expect(error.message).toBe("test3")
                    expect((error as BaseError).isOperational).toBe(false)
                    expect((error as BaseError).name).toBe("BaseError")
                    expect((error as BaseError).payload).toEqual(new Error("test3"))

                }
            }
        })
        it("Should handle random throw value correctly", async() => {
            const createUserSpy = jest.spyOn(userRepository, "createUser")
            createUserSpy.mockImplementation((user: User) => {
                try{
                    throw "testing"
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.CREATE, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.createUser({} as User)
            }catch(error: any){
                const currentErr = (error as BaseError)
                expect(currentErr).toBeInstanceOf(BaseError)
                expect(currentErr.message).toBe("Unknown error occured")
                expect(currentErr.isOperational).toBe(false)
                expect(currentErr.name).toBe("BaseError")
                expect(currentErr.payload).toBe("testing")
            }
        })
    })

    describe('readByEmail method', () => { 
        it("Should return the user if email is used", async() => {
            const email = "testemail1@test.com"
            const newUser = await insertUser(new User(email, "testusername1", "testpassword1"))
            const readByEmailSpy = jest.spyOn(userRepository,"readByEmail")
            const user = await userRepository.readByEmail(email)
            
            expect(readByEmailSpy).toReturnWith(Promise.resolve(newUser))
            expect(readByEmailSpy).toBeCalledWith(email)
            expect(readByEmailSpy).toBeCalled()
            
            expect(user).toBeTruthy()
            expect(newUser).toEqual(user)

            await deleteAllUser()
        })
        
        it("Should return null if theres no user using the email", async() => {
            const email = "testemail1@test.com"
            const readByEmailSpy = jest.spyOn(userRepository,"readByEmail")
            const user = await userRepository.readByEmail(email)
            
            expect(readByEmailSpy).toReturnWith(Promise.resolve(null))
            expect(readByEmailSpy).toBeCalledWith(email)
            expect(readByEmailSpy).toBeCalled()

            expect(user).toBeFalsy()
            expect(user).toBeNull()
        })

        it("Should handle PrismaClientKnownRequestError correctly", async() => {
            const readByEmailSpy = jest.spyOn(userRepository, "readByEmail")
            readByEmailSpy.mockImplementation((email: string): Promise<User | null> => {
                try{
                    throw new PrismaClientKnownRequestError("test", {code: "P0001", clientVersion: "testClientVer"})
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.READ, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.readByEmail("email")
            }catch(error: any){
                if (error instanceof Error) {
                    if (error.name.includes('Prisma')){
                        expect(error).toBeInstanceOf(DatabaseError)
                        expect(error.message).toBe("test")
                        expect((error as DatabaseError).isOperational).toBe(true)
                        expect((error as DatabaseError).operation).toBe("READ")
                        expect((error as DatabaseError).payload).toEqual(
                            new PrismaClientKnownRequestError("test", {code: "P0001", clientVersion: "testClientVer"})
                        )
                    }
                }
            }
        })
        it("Should handle other prisma error correctly", async() => {
            const readByEmailSpy = jest.spyOn(userRepository, "readByEmail")
            readByEmailSpy.mockImplementation((email: string): Promise<User | null> => {
                try{
                    throw new PrismaClientInitializationError("test2", "test2")
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.READ, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.readByEmail("email")
            }catch(error: any){
                if (error instanceof Error) {
                    if (error.name.includes('Prisma')){
                        expect(error).toBeInstanceOf(DatabaseError)
                        expect(error.message).toBe("test")
                        expect((error as DatabaseError).isOperational).toBe(true)
                        expect((error as DatabaseError).operation).toBe("READ")
                        expect((error as DatabaseError).payload).toEqual(new PrismaClientInitializationError("test2", "test2"))
                    }
                }
            }
        })
        it("Should handle other error correctly", async() => {
            const readByEmailSpy = jest.spyOn(userRepository, "readByEmail")
            readByEmailSpy.mockImplementation((email: string): Promise<User | null> => {
                try{
                    throw new Error("test3")
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.READ, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.readByEmail("email")
            }catch(error: any){
                if (error instanceof Error) {
                    expect(error).toBeInstanceOf(BaseError)
                    expect(error.message).toBe("test3")
                    expect((error as BaseError).isOperational).toBe(false)
                    expect((error as BaseError).name).toBe("BaseError")
                    expect((error as BaseError).payload).toEqual(new Error("test3"))

                }
            }
        })
        it("Should handle random throw value correctly", async() => {
            const readByEmailSpy = jest.spyOn(userRepository, "readByEmail")
            readByEmailSpy.mockImplementation((email: string): Promise<User | null> => {
                try{
                    throw "testing"
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.READ, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.createUser({} as User)
            }catch(error: any){
                const currentErr = (error as BaseError)
                expect(currentErr).toBeInstanceOf(BaseError)
                expect(currentErr.message).toBe("Unknown error occured")
                expect(currentErr.isOperational).toBe(false)
                expect(currentErr.name).toBe("BaseError")
                expect(currentErr.payload).toBe("testing")
            }
        })
     })

    describe('readByUsername method', () => { 
        it("Should return the user if username is used", async() => {
            const username = "testusername1"
            const newUser = await insertUser(new User("testemail1@test.com", username, "testpassword1"))
            const readByUsernameSpy = jest.spyOn(userRepository,"readByUsername")
            const user = await userRepository.readByUsername(username)
            
            expect(readByUsernameSpy).toReturnWith(Promise.resolve(newUser))
            expect(readByUsernameSpy).toBeCalledWith(username)
            expect(readByUsernameSpy).toBeCalled()
            
            expect(user).toBeTruthy()
            expect(newUser).toEqual(user)

            await deleteAllUser()
        })
        
        it("Should return null if theres no user using the username", async() => {
            const username = "testusername1"
            const readByUsernameSpy = jest.spyOn(userRepository,"readByUsername")
            const user = await userRepository.readByUsername(username)
            
            expect(readByUsernameSpy).toReturnWith(Promise.resolve(null))
            expect(readByUsernameSpy).toBeCalledWith(username)
            expect(readByUsernameSpy).toBeCalled()

            expect(user).toBeFalsy()
            expect(user).toBeNull()
        })

        it("Should handle PrismaClientKnownRequestError correctly", async() => {
            const readByUsernameSpy = jest.spyOn(userRepository, "readByUsername")
            readByUsernameSpy.mockImplementation((username: string): Promise<User | null> => {
                try{
                    throw new PrismaClientKnownRequestError("test", {code: "P0001", clientVersion: "testClientVer"})
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.READ, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.readByUsername("username")
            }catch(error: any){
                if (error instanceof Error) {
                    if (error.name.includes('Prisma')){
                        expect(error).toBeInstanceOf(DatabaseError)
                        expect(error.message).toBe("test")
                        expect((error as DatabaseError).isOperational).toBe(true)
                        expect((error as DatabaseError).operation).toBe("READ")
                        expect((error as DatabaseError).payload).toEqual(
                            new PrismaClientKnownRequestError("test", {code: "P0001", clientVersion: "testClientVer"})
                        )
                    }
                }
            }
        })
        it("Should handle other prisma error correctly", async() => {
            const readByUsernameSpy = jest.spyOn(userRepository, "readByUsername")
            readByUsernameSpy.mockImplementation((username: string): Promise<User | null> => {
                try{
                    throw new PrismaClientInitializationError("test2", "test2")
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.READ, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.readByUsername("username")
            }catch(error: any){
                if (error instanceof Error) {
                    if (error.name.includes('Prisma')){
                        expect(error).toBeInstanceOf(DatabaseError)
                        expect(error.message).toBe("test")
                        expect((error as DatabaseError).isOperational).toBe(true)
                        expect((error as DatabaseError).operation).toBe("READ")
                        expect((error as DatabaseError).payload).toEqual(new PrismaClientInitializationError("test2", "test2"))
                    }
                }
            }
        })
        it("Should handle other error correctly", async() => {
            const readByUsernameSpy = jest.spyOn(userRepository, "readByUsername")
            readByUsernameSpy.mockImplementation((username: string): Promise<User | null> => {
                try{
                    throw new Error("test3")
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.READ, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.readByUsername("username")
            }catch(error: any){
                if (error instanceof Error) {
                    expect(error).toBeInstanceOf(BaseError)
                    expect(error.message).toBe("test3")
                    expect((error as BaseError).isOperational).toBe(false)
                    expect((error as BaseError).name).toBe("BaseError")
                    expect((error as BaseError).payload).toEqual(new Error("test3"))

                }
            }
        })
        it("Should handle random throw value correctly", async() => {
            const readByusernameSpy = jest.spyOn(userRepository, "readByUsername")
            readByusernameSpy.mockImplementation((username: string): Promise<User | null> => {
                try{
                    throw "testing"
                }catch(error: any) {
                    if (error instanceof Error) {
                        if (error.name.includes('Prisma')){
                            return Promise.reject(
                                new DatabaseError(error.message, true, DatabaseOperation.READ, error, error.name)
                            )
                        }else{
                            return Promise.reject(
                                new BaseError(error.message, false, error, error.name)
                            )
                        }
                    }
                    return Promise.reject(new BaseError("Unknown error occured", false, error))
                }
            })
            try{
                await userRepository.readByUsername("username")
            }catch(error: any){
                const currentErr = (error as BaseError)
                expect(currentErr).toBeInstanceOf(BaseError)
                expect(currentErr.message).toBe("Unknown error occured")
                expect(currentErr.isOperational).toBe(false)
                expect(currentErr.name).toBe("BaseError")
                expect(currentErr.payload).toBe("testing")
            }
        })
     })
 })