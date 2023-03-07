import ControllerFactory from '../../../../src/interfaces/factories/ControllerFactory'
import AuthControllerExpress from '../../../../src/application/controllers/express/AuthControllerExpress'
import ControllerFactoryExpress from '../../../../src/application/controllers/factories/ControllerFactoryExpress'

describe('Express Controller Factory', () => {
    const currentControllerFactory = ControllerFactoryExpress.getInstance()

    it("Should implement singleton pattern, have same instance as previous instace declared", () => {
        const localControllerFactory = ControllerFactoryExpress.getInstance()
        expect(localControllerFactory).toBeInstanceOf(ControllerFactoryExpress)
        expect(localControllerFactory === currentControllerFactory).toBe(true)
        expect(localControllerFactory === new ControllerFactoryExpress()).toBe(false)
        expect(currentControllerFactory === new ControllerFactoryExpress()).toBe(false)
    })

    it("Should implement ControllerFactory interface method", () => {
        expect(currentControllerFactory as ControllerFactory).toBeTruthy()
        expect(currentControllerFactory as ControllerFactory).toHaveProperty('createAuthController')
    })

    it("Should called method getInstance correctly", () => {
        const getInstanceSpy = jest.spyOn(ControllerFactoryExpress, 'getInstance')
        const localFactory = ControllerFactoryExpress.getInstance()
        expect(getInstanceSpy).toReturnWith(localFactory)
        expect(getInstanceSpy).toReturnWith(ControllerFactoryExpress.getInstance())
        expect(getInstanceSpy).toBeCalledTimes(2)
        expect(getInstanceSpy).toBeCalledWith()
    })
    it("Should have implemented createAuthController correctly", () => {
        const createAuthSpy = jest.spyOn(currentControllerFactory, 'createAuthController')
        const authController = currentControllerFactory.createAuthController()
        expect(authController).toBeInstanceOf(AuthControllerExpress)
        expect(currentControllerFactory.createAuthController()).toBe(authController)
        expect(currentControllerFactory.createAuthController()).not.toBe(new AuthControllerExpress())
        expect(createAuthSpy).toBeCalledTimes(3)
        expect(createAuthSpy).toBeCalledWith()
    })
 })