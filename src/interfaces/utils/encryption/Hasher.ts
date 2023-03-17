interface Hasher {
    hash(plainText: string, ...args: any[]): Promise<string>
    compare(plainText: string, hashedText: string, ...args: any[]): Promise<boolean>
}

export default Hasher