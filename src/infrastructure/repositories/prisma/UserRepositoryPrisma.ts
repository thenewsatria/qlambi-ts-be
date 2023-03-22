import { PrismaClient } from "@prisma/client";
import BaseError from "../../../application/errors/BaseError";
import DatabaseError from "../../../application/errors/databases/DatabaseError";
import User from "../../../domain/entities/User";
import DatabaseOperation from "../../../interfaces/enums/DatabaseOperationType";
import DatabaseResourceType from "../../../interfaces/enums/DatabaseResourceType";
import UserRepository from "../../../interfaces/repositories/UserRepository";

import prismaClient from "../../databases/prisma/client";

class UserRepositoryPrisma implements UserRepository {
    private _client: PrismaClient = prismaClient

    private static instance: UserRepositoryPrisma
    public static getInstance() {
        if(!UserRepositoryPrisma.instance){
            UserRepositoryPrisma.instance = new UserRepositoryPrisma()
        }

        return UserRepositoryPrisma.instance
    }

    async createUser(user: User): Promise<User> {
        try{
            const newUser = await this._client.user.create({
                data: {
                    email: user.getEmail(),
                    username: user.getUsername(),
                    password: user.getPassword()
                }
            })
            user.setId(newUser.id+"")
            user.setCreatedAt(newUser.createdAt)
            user.setUpdatedAt(newUser.updatedAt)   

            return Promise.resolve(user)
        } catch(error: any) {
            if (error instanceof Error) {
                if (error.name.includes('Prisma')){
                    return Promise.reject(
                        new DatabaseError(error.message, true, DatabaseOperation.CREATE, DatabaseResourceType.USER, error, error.name)
                    )
                }else{
                    return Promise.reject(
                        new BaseError(error.message, false, error, error.name)
                    )
                }
            }
            return Promise.reject(new BaseError("Unknown error occured", false, error))
        }
    }

    async readByEmail(email: string): Promise<User | null> {
        try{
            let user: User|null = null
            const result = await this._client.user.findUnique({
                where: {
                    email: email
                }
            })

            if(result) {
                user = new User(result.email, result.username, result.password)
                user.setId(result.id+"")
                user.setCreatedAt(result.createdAt)
                user.setUpdatedAt(result.updatedAt)   
            }

            return Promise.resolve(user)
        }catch(error: any) {
            if (error instanceof Error) {
                if (error.name.includes('Prisma')){
                    return Promise.reject(
                        new DatabaseError(error.message, true, DatabaseOperation.READ, DatabaseResourceType.USER, error, error.name)
                    )
                }else{
                    return Promise.reject(
                        new BaseError(error.message, false, error, error.name)
                    )
                }
            }
            return Promise.reject(new BaseError("Unknown error occured", false, error))
        }
    }

    async readByUsername(username: string): Promise<User| null> {
        try{
            let user: User|null = null
            const result = await this._client.user.findUnique({
                where: {
                    username: username
                }
            })

            if(result) {
                user = new User(result.email, result.username, result.password)
                user.setId(result.id+"")
                user.setCreatedAt(result.createdAt)
                user.setUpdatedAt(result.updatedAt)   
            }

            return Promise.resolve(user)
        }catch(error: any) {
            if (error instanceof Error) {
                if (error.name.includes('Prisma')){
                    return Promise.reject(
                        new DatabaseError(error.message, true, DatabaseOperation.READ, DatabaseResourceType.USER, error, error.name)
                    )
                }else{
                    return Promise.reject(
                        new BaseError(error.message, false, error, error.name)
                    )
                }
            }
            return Promise.reject(new BaseError("Unknown error occured", false, error))
        }
    }
}

export default UserRepositoryPrisma