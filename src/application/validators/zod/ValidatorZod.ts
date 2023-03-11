import { ZodError } from "zod";
import Validator from "../../../interfaces/validators/Validator";
import APIError from "../../errors/apis/APIError";

class ValidatorZod implements Validator {
    private static instance: ValidatorZod
    public static getInstance(): ValidatorZod {
        if(!ValidatorZod.instance) {
            ValidatorZod.instance = new ValidatorZod()
        }

        return ValidatorZod.instance
    }

    
    validate<DataT>(schema: any, data: DataT): Promise<DataT> {
        try{
            schema.parse(data)
            return Promise.resolve(data)
        }catch(error: any) {
            if(error instanceof Error) {
                if(error instanceof ZodError){
                    return Promise.reject(
                        new Error("x")
                    )
                }
                return Promise.reject(
                    new Error("y")
                )
            }
            return Promise.reject("z")
        }
    }
}

export default ValidatorZod
