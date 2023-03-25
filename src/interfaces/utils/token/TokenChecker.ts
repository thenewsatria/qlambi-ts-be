interface TokenChecker {
    isExpired(token: string, key: string, ...args:any[]): Promise<Boolean>
}

export default TokenChecker