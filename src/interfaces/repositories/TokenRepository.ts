import Token from "../../domain/entities/Token";

interface TokenRepository{
    createToken(token: Token): Promise<Token>
    readByUserEmail(userEmail: string): Promise<Token|null>
}

export default TokenRepository