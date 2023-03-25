import Token from "../../domain/entities/Token";

interface TokenRepository{
    createToken(token: Token): Promise<Token>
    readByUserEmail(userEmail: string): Promise<Token|null>
    updateToken(token: Token): Promise<Token>
}

export default TokenRepository