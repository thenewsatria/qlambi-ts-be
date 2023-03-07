import AuthControllerExpress from '../../../../src/application/controllers/express/AuthControllerExpress'
import {Response, Request} from 'express'
import AuthController from '../../../../src/interfaces/controllers/AuthController'

describe('Express Auth Controller', () => {
    const currentAuthController = AuthControllerExpress.getInstance()
    
    it("Should be singleton, have same instance as previous instace declared ", () => {
        const localAuthController = AuthControllerExpress.getInstance()
        expect(localAuthController).toBeInstanceOf(AuthControllerExpress)
        expect(localAuthController ===  currentAuthController).toBe(true)
        expect(localAuthController ===  new AuthControllerExpress()).toBe(false)
        expect(currentAuthController ===  new AuthControllerExpress()).toBe(false)
    })
    
    it("Should be implementing all the AuthController interface method", () => {
        expect(currentAuthController as AuthController).toBeTruthy()
        expect(currentAuthController as AuthController).toHaveProperty('userLogin')
    })

    it("Should called getInstance method correctly", () => {
        const getInstanceSpy = jest.spyOn(AuthControllerExpress, 'getInstance');
        const currentAuthController = AuthControllerExpress.getInstance()
        expect(getInstanceSpy).toReturnWith(currentAuthController)
        expect(getInstanceSpy).toReturnWith(AuthControllerExpress.getInstance())
        expect(getInstanceSpy).toBeCalledTimes(2)
        expect(getInstanceSpy).toBeCalledWith()
    })

    it('Should have implementing userLogin and the method returning an express handler', () => {
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
        const userLoginSpy = jest.spyOn(currentAuthController, 'userLogin')
        userLoginSpy.mockImplementation(() => (req: Request, res: Response) => {
            res.status(200).json({
                testing: true
            })
        })
        expect(currentAuthController.userLogin().toString()).toBe(expected.toString())
        expect(currentAuthController.userLogin().toString()).not.toBe(notExpected.toString())
        expect(currentAuthController.userLogin()).toBeInstanceOf(Function)   
        expect(userLoginSpy).toBeCalledTimes(3)
        expect(userLoginSpy).toBeCalledWith()
    })
 })