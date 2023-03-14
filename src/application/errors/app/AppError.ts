import AppOperationType from "../../../interfaces/enums/AppOperationType";
import BaseError from "../BaseError";

class AppError extends BaseError{
    name: string = "AppError"
    domain: string = "App"
    type: AppOperationType
    constructor(message: string, isOperational: boolean, type: AppOperationType, payload?: any, originalName?: any) {
        super(message, isOperational, payload, originalName)
        this.type = type
    }
}

export default AppError