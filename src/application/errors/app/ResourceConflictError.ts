import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import AppError from "./AppError";

class ResourceConflictError extends AppError{
    name: string = "ResourceConflictError"
    resource: ResourceType
    attribute: string[]

    constructor(message: string, isOperational: boolean, resource: ResourceType, attribute: string[], payload?: any, originalName?: any) {
        super(message, isOperational, AppOperationType.VALIDATION, payload, originalName)
        this.resource = resource,
        this.attribute = attribute
    }
}

export default ResourceConflictError