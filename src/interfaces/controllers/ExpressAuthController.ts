import { Request, Response } from "express"
import AuthController from "./abstracts/AuthController"

class ExpressAuthController implements AuthController {
 
    private static instance: ExpressAuthController

    public static getInstance(): ExpressAuthController {
        if(!ExpressAuthController.instance) {
            ExpressAuthController.instance = new ExpressAuthController()
        }

        return ExpressAuthController.instance
    }
    
    userLogin(): (...args: any[]) => any {
        return (req: Request, res: Response) => {
            res.status(200).json({
                rute: "signin"
            })
        }
    }
}

export default ExpressAuthController