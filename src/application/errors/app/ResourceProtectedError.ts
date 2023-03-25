import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import AppError from "./AppError";

class ResourceProtectedError extends AppError{
    name: string = "ResourceProtectedError"
    resource: ResourceType
    
    constructor(message: string, isOperational: boolean, type: AppOperationType, resource: ResourceType, payload?: any, originalName?: any) {
        super(message, isOperational, type, payload, originalName)
        this.resource = resource
    }
}

export default ResourceProtectedError