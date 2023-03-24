import {z, ZodSchema} from "zod";
import RegisterRequestDTO from "../../../../interfaces/dtos/auth/RegisterRequestDTO";
import AuthVSchema from "../../../../interfaces/validators/schemas/AuthVSchema";

class AuthVSchemasZod implements AuthVSchema {
    private static instance: AuthVSchemasZod
    
    public static getInstance(): AuthVSchemasZod {
        if(!AuthVSchemasZod.instance){
            AuthVSchemasZod.instance = new AuthVSchemasZod()
        }

        return AuthVSchemasZod.instance
    }
    
    getRegisterRequestSchema(): ZodSchema<RegisterRequestDTO> {
        return z.object({
            username: z.string({
                    required_error: "Username is required",
                    invalid_type_error: "Username must be a string"
                })
                .min(5, {
                    message: "username must be at least 5 character"
                })
                .max(25, {
                    message: "username must be less than 25 character"
                })
                .regex(/^[a-z0-9_.]+$/, {
                    message: "Username can only contain lowercase characters, period, and underscores"
                }),
            email: z.string({
                    required_error: "Email is required",
                    invalid_type_error: "Email must be a string"
                })
                .email({
                    message: "Invalid email"
                }),
            password: z.string()
                .min(8, {
                    message: "Password must be at least 8 characters long"
                }),
            confirmPassword: z.string()
                .min(8, {
                    message: "Confirm password must be at least 8 characters long"
                }),
            IP: z.string().ip(),
            userAgent: z.string()
        })
        .required({
            username: true,
            email: true,
            password: true,
            confirmPassword: true
        })
        .refine(({password, confirmPassword}) => password === confirmPassword, {
            message: "Confirm password don't match",
            path: ["confirmPassword"]
        })
    }

    getLoginRequestSchema() {
        throw new Error("Method not implemented.");
    }
}

export default AuthVSchemasZod