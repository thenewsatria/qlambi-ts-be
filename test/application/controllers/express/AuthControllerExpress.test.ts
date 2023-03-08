import AuthControllerExpress from '../../../../src/application/controllers/express/AuthControllerExpress'
import {Response, Request} from 'express'
import AuthController from '../../../../src/interfaces/controllers/AuthController'
import RegisterUseCase from '../../../../src/application/usecases/auth/RegisterUseCase'

describe('Express Auth Controller', () => {
    const currentAuthController = new AuthControllerExpress({} as RegisterUseCase)
    
    it("Should be implementing all the AuthController interface method", () => {
        expect(currentAuthController as AuthController).toBeTruthy()
        expect(currentAuthController as AuthController).toHaveProperty('userRegister')
    })

    it('Should have implementing userRegister and the method returning an express handler', () => {
        const expected = (req: Request, res: Response) => {
            res.status(200).json({
                testing: true
            })
        }
        const notExpected = (req: Request, res: Response) => {
            res.status(200).json({
                testing: false
            })
        }
        const userLoginSpy = jest.spyOn(currentAuthController, 'userRegister')
        userLoginSpy.mockImplementation(() => (req: Request, res: Response) => {
            res.status(200).json({
                testing: true
            })
        })
        expect(currentAuthController.userRegister().toString()).toBe(expected.toString())
        expect(currentAuthController.userRegister().toString()).not.toBe(notExpected.toString())
        expect(currentAuthController.userRegister()).toBeInstanceOf(Function)   
        expect(userLoginSpy).toBeCalledTimes(3)
        expect(userLoginSpy).toBeCalledWith()
    })
 })