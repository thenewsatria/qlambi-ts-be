import APIError from "./APIError";

class BadRequestError<MessagesT> extends APIError {
    name: string = "BadRequestError"
    messages: MessagesT[]

    constructor(message: string, messages: MessagesT[], isOperational: boolean = true, payload?: any, originalName?: string) {
        super(message, isOperational, 400, payload, originalName)
        this.messages = messages
    }
}

export default BadRequestError