import ExpressAuthController from '../../../../src/interfaces/controllers/ExpressAuthController'
import ExpressControllerFactory from '../../../../src/interfaces/controllers/factories/ExpressControllerFactory'

describe('Express Controller Factory', () => {
    const currentControllerFactory = ExpressControllerFactory.getInstance()

    it("Should implement singleton pattern, have same instance as previous instace declared", () => {
        const localControllerFactory = ExpressControllerFactory.getInstance()
        expect(localControllerFactory).toBeInstanceOf(ExpressControllerFactory)
        expect(localControllerFactory === currentControllerFactory).toBe(true)
        expect(localControllerFactory === new ExpressControllerFactory()).toBe(false)
        expect(currentControllerFactory === new ExpressControllerFactory()).toBe(false)
    })

    it("Should implement controller factory interface method", () => {
        expect('createAuthController' in currentControllerFactory)
    })
    
    it("Should be instance of ControllerFactory", () => {
        expect(currentControllerFactory).toBeInstanceOf(ExpressControllerFactory)
    })

    it("Should called method getInstance correctly", () => {
        const getInstanceSpy = jest.spyOn(ExpressControllerFactory, 'getInstance')
        expect(getInstanceSpy).toReturnWith(ExpressControllerFactory.getInstance())
        expect(getInstanceSpy).toReturnWith(currentControllerFactory)
        expect(getInstanceSpy).toBeCalledTimes(1)
        expect(getInstanceSpy).toBeCalledWith()
    })
    it("Should have implemented createAuthController correctly", () => {
        const createAuthSpy = jest.spyOn(currentControllerFactory, 'createAuthController')
        const authController = currentControllerFactory.createAuthController()
        expect(authController).toBeInstanceOf(ExpressAuthController)
        expect(currentControllerFactory.createAuthController()).toBe(authController)
        expect(currentControllerFactory.createAuthController()).not.toBe(new ExpressAuthController())
        expect(createAuthSpy).toBeCalledTimes(3)
        expect(createAuthSpy).toBeCalledWith()
    })
 })