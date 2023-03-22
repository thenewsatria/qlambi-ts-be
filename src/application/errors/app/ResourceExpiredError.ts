import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import AppError from "./AppError";

class ResourceExpiredError extends AppError{
    name: string = "ResourceExpiredError"
    resource: ResourceType

    constructor(message: string, isOperational: boolean, type: AppOperationType, resource: ResourceType, payload?: any, originalName?: any) {
        super(message, isOperational, type, payload, originalName)
        this.resource = resource
    }
}

export default ResourceExpiredError