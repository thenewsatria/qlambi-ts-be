class BaseError extends Error {
    name: string = "BaseError"
    isOperational: boolean
    payload?: any
    originalName?: string

    constructor(message: string, isOperational: boolean, payload?: any, originalName?: string, ){
        super(message)
        this.isOperational = isOperational
        this.payload = payload
        this.originalName = originalName
    }
}

export default BaseError