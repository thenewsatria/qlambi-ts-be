import DatabaseOperationType from "../../../interfaces/enums/DatabaseOperationType";
import DatabaseResourceType from "../../../interfaces/enums/DatabaseResourceType";
import BaseError from "../BaseError";

class DatabaseError extends BaseError {
    name: string = "DatabaseError"
    domain: string = "database"
    operation: DatabaseOperationType
    resourceType: DatabaseResourceType

    constructor(message: string, isOperational: boolean = true, operation: DatabaseOperationType, 
        resourceType: DatabaseResourceType, payload?: any, originalName?: string){

        super(message, isOperational, payload, originalName);
        this.operation = operation
        this.resourceType = resourceType
    }
}

export default DatabaseError