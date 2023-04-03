import { PrismaClient } from "@prisma/client";
import UsedToken from "../../../domain/entities/UsedToken";
import UsedTokenRepository from "../../../interfaces/repositories/UsedTokenRepository";
import prismaClient from "../../databases/prisma/client";

class UsedTokenRepositoryPrisma implements UsedTokenRepository {
    private readonly _client: PrismaClient = prismaClient

    private static instance: UsedTokenRepositoryPrisma
    public static getInstance() {
        if(!UsedTokenRepositoryPrisma.instance){
            UsedTokenRepositoryPrisma.instance = new UsedTokenRepositoryPrisma()
        }

        return UsedTokenRepositoryPrisma.instance
    }

    async createUsedToken(usedToken: UsedToken): Promise<UsedToken> {
        const createdUsedToken = await this._client.usedToken.create({
            data: {
                userEmail: usedToken.getUserEmail(),
                usedRefreshToken: usedToken.getUsedRefreshToken()
            }
        })

        usedToken.setId(createdUsedToken.id+"")
        usedToken.setCreatedAt(createdUsedToken.createdAt)
        usedToken.setUpdatedAt(createdUsedToken.updatedAt)
        return Promise.resolve(usedToken)
    }
    
    async readByUsedRefreshToken(usedRefreshToken: string): Promise<UsedToken | null> {
        let usedToken: UsedToken | null = null

        const usedTokenResult = await this._client.usedToken.findFirst({
            where: {
                usedRefreshToken: usedRefreshToken
            }
        })
        
        if(usedTokenResult) {
            usedToken = new UsedToken(usedTokenResult.userEmail, usedTokenResult.usedRefreshToken)
            usedToken.setId(usedTokenResult.id+"")
            usedToken.setCreatedAt(usedTokenResult.createdAt)
            usedToken.setUpdatedAt(usedTokenResult.updatedAt)
        }

        return Promise.resolve(usedToken)
    }

    async readByUserEmail(userEmail: string): Promise<UsedToken | null> {
        let usedToken: UsedToken | null = null

        const usedTokenResult = await this._client.usedToken.findUnique({
            where: {
                userEmail: userEmail
            }
        })

        if(usedTokenResult) {
            usedToken = new UsedToken(usedTokenResult.userEmail, usedTokenResult.usedRefreshToken)
            usedToken.setId(usedTokenResult.id+"")
            usedToken.setCreatedAt(usedTokenResult.createdAt)
            usedToken.setUpdatedAt(usedTokenResult.updatedAt)
        }

        return Promise.resolve(usedToken)
    }

    async updateUsedToken(usedToken: UsedToken): Promise<UsedToken> {
        const updatedUsedToken = await this._client.usedToken.update({
            where: {
                id: +usedToken.getId()!
            },
            data: {
                usedRefreshToken: usedToken.getUsedRefreshToken(),
                userEmail: usedToken.getUserEmail(),
            }
        })

        usedToken.setUpdatedAt(updatedUsedToken.updatedAt)
        return Promise.resolve(usedToken)
    }
}

export default UsedTokenRepositoryPrisma