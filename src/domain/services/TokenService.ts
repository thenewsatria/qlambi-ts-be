import UserEmailDTO from "../../interfaces/dtos/token/singular/UserEmailDTO";
import TokenCreationDTO from "../../interfaces/dtos/token/TokenCreationDTO";
import TokenUpdateDTO from "../../interfaces/dtos/token/TokenUpdateDTO";
import TokenRepository from "../../interfaces/repositories/TokenRepository";
import TokenChecker from "../../interfaces/utils/token/TokenChecker";
import TokenDecoder from "../../interfaces/utils/token/TokenDecoder";
import TokenGenerator from "../../interfaces/utils/token/TokenGenerator";
import Token from "../entities/Token";

class TokenService {
    private readonly repository: TokenRepository
    private readonly tokenTools: TokenGenerator & TokenDecoder & TokenChecker
    
    constructor(repository: TokenRepository, tokenTools: TokenGenerator & TokenDecoder & TokenChecker) {
        this.repository = repository
        this.tokenTools = tokenTools
    }

    async generateToken<PayloadT, OptionsT>(payload: PayloadT, key: string, options: OptionsT): Promise<string> {
        const generatedToken = await this.tokenTools.generate(payload, key, options)
        return Promise.resolve(generatedToken)
    }

    async insertToken(token: TokenCreationDTO): Promise<Token>{
        const newToken = new Token(token.userEmail, token.refreshToken, token.IP, token.userAgent, token.isBlocked)
        const insertedUser = await this.repository.createToken(newToken)
        return Promise.resolve(insertedUser)
    }

    async fetchByUserEmail(data: UserEmailDTO): Promise<Token|null>{
        const token = await this.repository.readByUserEmail(data.userEmail)
        return Promise.resolve(token)
    }

    async updateToken(data: TokenUpdateDTO): Promise<Token>{
        const updatedToken = await this.repository.updateToken(data.token)
        return Promise.resolve(updatedToken)
    }
}

export default TokenService