interface TokenDecoder {
    decode(token: string, key: string, ...args:any[]): Promise<any>
}

export default TokenDecoder