interface TokenCreationDTO {
    userEmail: string
    refreshToken: string
    IP: string
    userAgent: string
    isBlocked: boolean
}

export default TokenCreationDTO