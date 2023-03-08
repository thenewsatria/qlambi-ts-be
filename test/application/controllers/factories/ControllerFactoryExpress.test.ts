import ControllerFactory from '../../../../src/interfaces/factories/ControllerFactory'
import AuthControllerExpress from '../../../../src/application/controllers/express/AuthControllerExpress'
import ControllerFactoryExpress from '../../../../src/application/controllers/factories/ControllerFactoryExpress'
import RegisterUseCase from '../../../../src/application/usecases/auth/RegisterUseCase'

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
        const localRegisterUC= {} as RegisterUseCase
        createAuthSpy.mockImplementation((registerUC: RegisterUseCase) => {
            return new AuthControllerExpress(registerUC)
        })

        const authController = currentControllerFactory.createAuthController(localRegisterUC)
        expect(authController).toBeInstanceOf(AuthControllerExpress)
        expect(currentControllerFactory.createAuthController(localRegisterUC)).toEqual(authController)
        expect(currentControllerFactory.createAuthController({} as RegisterUseCase)).not.toBe(authController)
        expect(currentControllerFactory.createAuthController({} as RegisterUseCase)).toEqual(new AuthControllerExpress({} as RegisterUseCase))
        expect(currentControllerFactory.createAuthController({} as RegisterUseCase)).not.toBe(new AuthControllerExpress({} as RegisterUseCase))
        expect(createAuthSpy).toBeCalledTimes(5)
        expect(createAuthSpy).toBeCalledWith({} as RegisterUseCase)
        expect(createAuthSpy).toReturnWith(new AuthControllerExpress({} as RegisterUseCase))
    })
 })