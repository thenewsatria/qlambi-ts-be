import APIError from "./APIError";

class UnauthorizedError extends APIError {
    name: string = "UnauthorizedError"

    constructor(message: string, isOperational: boolean = true, payload?: any, originalName?: string) {
        super(message, isOperational, 401, payload, originalName)
    }
}

export default UnauthorizedError