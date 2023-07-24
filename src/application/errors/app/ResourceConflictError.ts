import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import AppError from "./AppError";

/**
 * Represents an error for resource conflict, for example:
 * - Username is already used so new user cant use this username
 * - Email is already used so new user cant use this email
 *
 * @class
 */
class ResourceConflictError extends AppError{
    name: string = "ResourceConflictError"
    resource: ResourceType
    attribute: string[]

    constructor(message: string, isOperational: boolean, type: AppOperationType,  resource: ResourceType, attribute: string[], payload?: any, originalName?: any) {
        super(message, isOperational, type, payload, originalName)
        this.resource = resource,
        this.attribute = attribute
    }
}

export default ResourceConflictError