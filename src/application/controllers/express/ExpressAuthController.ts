import { Request, Response } from "express"
import AuthController from "../../../interfaces/controllers/AuthController"

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
            res.status(404).json({
                rute: "signin"
            })
        }
    }
}

export default ExpressAuthController