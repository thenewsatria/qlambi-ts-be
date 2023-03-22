interface TokenGenerator {
    generate(payload: any, key: string, ...args: any[]): Promise<string>
}

export default TokenGenerator