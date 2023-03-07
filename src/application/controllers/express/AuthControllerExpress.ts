import { Request, Response } from "express"
import AuthController from "../../../interfaces/controllers/AuthController"

class AuthControllerExpress implements AuthController {
 
    private static instance: AuthControllerExpress

    public static getInstance(): AuthControllerExpress {
        if(!AuthControllerExpress.instance) {
            AuthControllerExpress.instance = new AuthControllerExpress()
        }

        return AuthControllerExpress.instance
    }
    
    userLogin(): (...args: any[]) => any {
        return (req: Request, res: Response) => {
            res.status(404).json({
                rute: "signin"
            })
        }
    }
}

export default AuthControllerExpress