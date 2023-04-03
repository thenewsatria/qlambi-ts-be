import UsedToken from "../../domain/entities/UsedToken";

interface UsedTokenRepository {
    createUsedToken(usedToken: UsedToken): Promise<UsedToken>
    readByUsedRefreshToken(usedRefreshToken: string): Promise<UsedToken | null>
    readByUserEmail(userEmail: string): Promise<UsedToken | null>
    updateUsedToken(usedToken: UsedToken): Promise<UsedToken>
}

export default UsedTokenRepository