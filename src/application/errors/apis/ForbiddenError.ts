import APIError from "./APIError";

class ForbiddenError extends APIError {
    name: string = "ForbiddenError"

    constructor(message: string, isOperational: boolean = true, payload?: any, originalName?: string) {
        super(message, isOperational, 403, payload, originalName)
    }
}

export default ForbiddenError