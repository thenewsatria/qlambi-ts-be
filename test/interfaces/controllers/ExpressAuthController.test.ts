import ExpressAuthController from '../../../src/interfaces/controllers/ExpressAuthController'
import {Response, Request} from 'express'

describe('Express Auth Controller', () => {
    const currentAuthController = ExpressAuthController.getInstance()
    
    it("Should be singleton, have same instance as previous instace declared ", () => {
        const localAuthController = ExpressAuthController.getInstance()
        expect(localAuthController).toBeInstanceOf(ExpressAuthController)
        expect(localAuthController ===  currentAuthController).toBe(true)
        expect(localAuthController ===  new ExpressAuthController()).toBe(false)
        expect(currentAuthController ===  new ExpressAuthController()).toBe(false)
    })
    
    it("Should be implementing all the AuthController interface method", () => {
        expect('userLogin' in currentAuthController).toBe(true)
    })

    it("Should called getInstance method correctly", () => {
        const getInstanceSpy = jest.spyOn(ExpressAuthController, 'getInstance');
        const currentAuthController = ExpressAuthController.getInstance()
        expect(getInstanceSpy).toBeCalledTimes(1)
        expect(getInstanceSpy).toReturnWith(currentAuthController)
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