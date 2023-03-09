import DatabaseOperationType from "../../../interfaces/enums/DatabaseOperationType";
import BaseError from "../BaseError";

class DatabaseError extends BaseError {
    name: string = "DatabaseError"
    domain: string = "database"
    operation: DatabaseOperationType
    payload?: any
    originalName?: string

    constructor(message: string, isOperational: boolean = true, operation: DatabaseOperationType, payload?: any, originalName?: string){
        super(message, isOperational, payload, originalName);
        this.operation = operation
    }
}

export default DatabaseError