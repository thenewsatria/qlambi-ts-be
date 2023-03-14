import APIError from "./apis/APIError";
import BadRequestError from "./apis/BadRequestError";
import InternalServerError from "./apis/InternalServerError";
import AppError from "./app/AppError";
import ValidationError from "./app/ValidationError";
import BaseError from "./BaseError";
import DatabaseError from "./databases/DatabaseError";

class ErrorTranslator {
    private static instance: ErrorTranslator

    public static getInstance(): ErrorTranslator {
        if(!ErrorTranslator.instance){
            ErrorTranslator.instance = new ErrorTranslator()
        }
        return ErrorTranslator.instance
    }

    xErrorToAPIError(error: Error): APIError {
        switch(error.name) {
            case "ValidationError":
                return new BadRequestError(error.message, (error as ValidationError<any>).issues)
            case "DatabaseError":
                return new InternalServerError(error.message, true, error, error.name)
            case "AppError":
                return new InternalServerError(error.message, true, error, error.name)
            case "BaseError":
                return new InternalServerError(error.message, true, error, error.name)
            default:
                return new InternalServerError(error.message, false, error, error.name)
        }
    }
}

export default ErrorTranslator