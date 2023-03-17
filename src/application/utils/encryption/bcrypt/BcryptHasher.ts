import Hasher from "../../../../interfaces/utils/encryption/Hasher";
import bcrypt from 'bcrypt'

class BcryptHasher implements Hasher {
    private static instance: BcryptHasher
    public static getInstance(): BcryptHasher {
        if(!BcryptHasher.instance) {
            BcryptHasher.instance = new BcryptHasher()
        }
        return BcryptHasher.instance
    }

    async hash(plainText: string, saltRounds: number): Promise<string> {
        const hashed = await bcrypt.hash(plainText, saltRounds)
        return Promise.resolve(hashed)
    }
    async compare(plainText: string, hashedText: string): Promise<boolean> {
        const result = await bcrypt.compare(plainText, hashedText)
        return Promise.resolve(result)
    }
}

export default BcryptHasher