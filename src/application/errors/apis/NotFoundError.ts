import APIError from "./APIError";

class NotFoundError extends APIError {
    name: string = "NotFoundError"

    constructor(message: string, isOperational: boolean = true, payload?: any, originalName?: string) {
        super(message, isOperational, 404, payload, originalName)
    }
}

export default NotFoundError