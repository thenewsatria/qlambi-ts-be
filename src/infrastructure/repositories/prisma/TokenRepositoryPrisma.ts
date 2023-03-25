import {PrismaClient} from '@prisma/client'
import BaseError from '../../../application/errors/BaseError';
import DatabaseError from '../../../application/errors/databases/DatabaseError';
import Token from "../../../domain/entities/Token";
import DatabaseOperation from '../../../interfaces/enums/DatabaseOperationType';
import DatabaseResourceType from '../../../interfaces/enums/DatabaseResourceType';
import TokenRepository from "../../../interfaces/repositories/TokenRepository";
import prismaClient from '../../databases/prisma/client';

class TokenRepositoryPrisma implements TokenRepository {
    private readonly _client: PrismaClient = prismaClient

    private static instance: TokenRepositoryPrisma
    public static getInstance() {
        if(!TokenRepositoryPrisma.instance){
            TokenRepositoryPrisma.instance = new TokenRepositoryPrisma()
        }

        return TokenRepositoryPrisma.instance
    }

    async createToken(token: Token): Promise<Token> {
        try{
            const createdToken = await this._client.token.create({
                data: {
                    userEmail: token.getEmail(),
                    refreshToken: token.getRefreshToken(),
                    IP: token.getIP(),
                    userAgent: token.getUserAgent(),
                    isBlocked: token.getIsBlocked()
                }
            })
    
            token.setId(createdToken.id+"")
            token.setCreatedAt(createdToken.createdAt)
            token.setUpdatedAt(createdToken.updatedAt)
            return Promise.resolve(token)
        }catch(error: unknown) {
            if (error instanceof Error) {
                if (error.name.includes('Prisma')){
                    return Promise.reject(
                        new DatabaseError(error.message, true, DatabaseOperation.CREATE, DatabaseResourceType.TOKEN, error, error.name)
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

    async readByUserEmail(userEmail: string): Promise<Token | null> {
        let userToken: Token | null = null
        const tokenResult = await this._client.token.findUnique({
            where: {
                userEmail: userEmail
            }
        })

        if(tokenResult) {
            userToken = new Token(tokenResult.userEmail, tokenResult.refreshToken, 
                tokenResult.IP, tokenResult.userAgent, tokenResult.isBlocked)
            userToken.setId(tokenResult.id+"")
            userToken.setCreatedAt(tokenResult.createdAt)
            userToken.setUpdatedAt(tokenResult.updatedAt)
        }
        
        return Promise.resolve(userToken)
    }

    async updateToken(token: Token): Promise<Token> {
        const updateRes = await this._client.token.update({
            where: {
                id: +token.getId()!
            },
            data: {
                refreshToken: token.getRefreshToken(),
                IP: token.getIP(),
                userAgent: token.getUserAgent(),
                isBlocked: token.getIsBlocked()
            }
        })

        token.setUpdatedAt(updateRes.updatedAt)
        return Promise.resolve(token)
    }
}

export default TokenRepositoryPrisma