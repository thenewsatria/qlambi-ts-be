import ControllerFactory from '../../../../src/interfaces/factories/ControllerFactory'
import ExpressAuthController from '../../../../src/application/controllers/express/ExpressAuthController'
import ExpressControllerFactory from '../../../../src/application/controllers/factories/ExpressControllerFactory'

describe('Express Controller Factory', () => {
    const currentControllerFactory = ExpressControllerFactory.getInstance()

    it("Should implement singleton pattern, have same instance as previous instace declared", () => {
        const localControllerFactory = ExpressControllerFactory.getInstance()
        expect(localControllerFactory).toBeInstanceOf(ExpressControllerFactory)
        expect(localControllerFactory === currentControllerFactory).toBe(true)
        expect(localControllerFactory === new ExpressControllerFactory()).toBe(false)
        expect(currentControllerFactory === new ExpressControllerFactory()).toBe(false)
    })

    it("Should implement ControllerFactory interface method", () => {
        expect(currentControllerFactory as ControllerFactory).toBeTruthy()
        expect(currentControllerFactory as ControllerFactory).toHaveProperty('createAuthController')
    })

    it("Should called method getInstance correctly", () => {
        const getInstanceSpy = jest.spyOn(ExpressControllerFactory, 'getInstance')
        const localFactory = ExpressControllerFactory.getInstance()
        expect(getInstanceSpy).toReturnWith(localFactory)
        expect(getInstanceSpy).toReturnWith(ExpressControllerFactory.getInstance())
        expect(getInstanceSpy).toBeCalledTimes(2)
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