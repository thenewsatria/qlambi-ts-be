import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import AppError from "./AppError";

class ResourceNotFoundError extends AppError{
    name: string = "ResourceNotFoundError"
    resource: ResourceType
    
    constructor(message: string, isOperational: boolean, type: AppOperationType, resource: ResourceType, payload?: any, originalName?: any) {
        super(message, isOperational, type, payload, originalName)
        this.resource = resource
    }
}

export default ResourceNotFoundError