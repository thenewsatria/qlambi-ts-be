import {z, ZodSchema} from "zod";
import LoginRequestDTO from "../../../../interfaces/dtos/auth/LoginRequestDTO";
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
            confirmPassword: z.string(),
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

    getLoginRequestSchema(): ZodSchema<LoginRequestDTO> {
        return z.object({
            credential: z.string({
                required_error: "Email or username is required",
                invalid_type_error: "Email or username must be a string"
            }),
            password: z.string({
                required_error: "Password is required",
                invalid_type_error: "Password must be a string"
            }),
            IP: z.string().ip(),
            userAgent: z.string()
        })
        .required({
            credential: true,
            password: true
        })
    }

    getValidEmailSchema(): ZodSchema<string> {
        return z.string().email()
    }
}

export default AuthVSchemasZod