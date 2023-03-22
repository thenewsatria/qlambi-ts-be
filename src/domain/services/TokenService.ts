import TokenCreationDTO from "../../interfaces/dtos/token/TokenCreationDTO";
import TokenRepository from "../../interfaces/repositories/TokenRepository";
import TokenDecoder from "../../interfaces/utils/token/TokenDecoder";
import TokenGenerator from "../../interfaces/utils/token/TokenGenerator";
import Token from "../entities/Token";

class TokenService {
    private readonly repository: TokenRepository
    private readonly tokenTools: TokenGenerator & TokenDecoder
    
    constructor(repository: TokenRepository, tokenTools: TokenGenerator & TokenDecoder) {
        this.repository = repository
        this.tokenTools = tokenTools
    }

    async generateToken<PayloadT, OptionsT>(payload: PayloadT, key: string, options: OptionsT): Promise<string> {
        const generatedToken = await this.tokenTools.generate(payload, key, options)
        return Promise.resolve(generatedToken)
    }

    async insertToken(token: TokenCreationDTO): Promise<Token>{
        const newToken = new Token(token.email, token.refreshToken, token.IP, token.userAgent, token.isBlocked)
        const insertedUser = await this.repository.createToken(newToken)
        return Promise.resolve(insertedUser)
    }
}

export default TokenService