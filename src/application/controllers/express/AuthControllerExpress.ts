import { Request, Response } from "express"
import RegisterUseCase from "../../../application/usecases/auth/RegisterUseCase"
import AuthController from "../../../interfaces/controllers/AuthController"
import AuthVSchema from "../../../interfaces/validators/schemas/AuthVSchema"
import { registerSuccessReponse } from "../../presenters/express/presenter"

class AuthControllerExpress implements AuthController {
    private registerUseCase: RegisterUseCase
    private authSchemas: AuthVSchema

    constructor(registerUseCase: RegisterUseCase, authShemas: AuthVSchema) {
        this.authSchemas = authShemas
        this.registerUseCase = registerUseCase
    }

    userRegister(): (...args: any[]) => any {
        return async (req: Request, res: Response) => {
            try{
                const tokens = await this.registerUseCase.execute(
                    {...req.body},
                    this.authSchemas.getRegisterRequestSchema())
                return registerSuccessReponse(res, tokens)
            }catch(err) {

            }
            
        }
    }

    userLogin(): (...args: any[]) => any {
        return async (req: Request, res: Response) => {
            return res.status(404).json({
                rute: "signin"
            })
        }
    }
}

export default AuthControllerExpress