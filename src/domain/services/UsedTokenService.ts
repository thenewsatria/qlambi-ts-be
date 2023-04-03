import UserEmailDTO from "../../interfaces/dtos/usedToken/singular/UserEmailDTO"
import UsedRefreshTokenDTO from "../../interfaces/dtos/usedToken/singular/UsedRefreshTokenDTO"
import UsedTokenRepository from "../../interfaces/repositories/UsedTokenRepository"
import UsedToken from "../entities/UsedToken"
import UsedTokenDTO from "../../interfaces/dtos/usedToken/singular/UsedTokenDTO"
import UsedTokenCreationDTO from "../../interfaces/dtos/usedToken/UsedTokenCreationDTO"

class UsedTokenService {
    private readonly repository: UsedTokenRepository

    constructor(repository: UsedTokenRepository) {
        this.repository = repository
    }

    async insertUsedToken(data: UsedTokenCreationDTO): Promise<UsedToken> {
        const newUsedToken = new UsedToken(data.userEmail, data.usedRefreshToken)
        const insertedUsedToken = await this.repository.createUsedToken(newUsedToken)
        return Promise.resolve(insertedUsedToken)
    }

    async fetchByUsedRefreshToken(data: UsedRefreshTokenDTO): Promise<UsedToken | null> {
        const usedToken = await this.repository.readByUsedRefreshToken(data.usedRefreshToken)
        return Promise.resolve(usedToken)
    }

    async fetchByUserEmail(data: UserEmailDTO): Promise<UsedToken|null> {
        const usedToken = await this.repository.readByUserEmail(data.userEmail)
        return Promise.resolve(usedToken)
    }

    async updateUsedToken(data: UsedTokenDTO): Promise<UsedToken> {
        const updatedUsedToken = await this.repository.updateUsedToken(data.usedToken)
        return Promise.resolve(updatedUsedToken)
    }
}

export default UsedTokenService