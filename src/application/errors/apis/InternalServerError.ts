import APIError from "./APIError";

class InternalServerError extends APIError {
    name: string = "InternalServerError"
    domain: string = "API"

    constructor(message: string, isOperational: boolean = true, payload?: any, originalName?: string) {
        super(message, isOperational, 500, payload, originalName)
    }
}

export default InternalServerError