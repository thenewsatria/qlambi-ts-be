import AppOperationType from "../../../interfaces/enums/AppOperationType";
import AppError from "./AppError";

class ValidationError<ErrObjectT> extends AppError{
    name: string = "ValidationError"
    issues: ErrObjectT[]

    constructor(message: string, isOperational: boolean, issues: ErrObjectT[], payload?: any, originalName?: any) {
        super(message, isOperational, AppOperationType.VALIDATION, payload, originalName)
        this.issues = issues
    }
}

export default ValidationError