import HttpStatusCode from "../../../interfaces/enums/HttpStatusCode";
import BaseError from "../BaseError";

class APIError extends BaseError {
    name: string = "APIError"
    domain: string = "API"
    statusCode: HttpStatusCode

    constructor(message: string, isOperational: boolean = true, 
        statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR, payload?: any, originalName?: string) {
        
        super(message, isOperational, payload, originalName)
        this.statusCode = statusCode
    }
}

export default APIError