import { ZodError, ZodIssue, ZodSchema } from "zod";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import Validator from "../../../interfaces/validators/Validator";
import AppError from "../../errors/app/AppError";
import ValidationError from "../../errors/app/ValidationError";
import BaseError from "../../errors/BaseError";

class ValidatorZod implements Validator {
    private static instance: ValidatorZod
    public static getInstance(): ValidatorZod {
        if(!ValidatorZod.instance) {
            ValidatorZod.instance = new ValidatorZod()
        }

        return ValidatorZod.instance
    }
    
    validate<DataT>(schema: ZodSchema, data: DataT): Promise<DataT> {
        try{
            schema.parse(data)
            return Promise.resolve(data)
        }catch(error: any) {
            if(error instanceof Error) {
                if(error instanceof ZodError){
                    return Promise.reject(
                        new ValidationError<ZodIssue>(error.message, true, error.issues, error, error.name)
                    )
                }
                return Promise.reject(
                    new AppError(error.message, true, AppOperationType.VALIDATION, error, error.name)
                )
            }
            return Promise.reject(
                new BaseError("Unknown error occured ", false, error)
            )
        }
    }

    isValid<DataT>(schema: ZodSchema, data: DataT): Promise<Boolean> {
        const result = schema.safeParse(data)
        return Promise.resolve(result.success)
    }
}

export default ValidatorZod
