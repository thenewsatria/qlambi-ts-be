import ControllerFactory from '../../../../src/interfaces/factories/ControllerFactory'
import AuthControllerExpress from '../../../../src/application/controllers/express/AuthControllerExpress'
import ControllerFactoryExpress from '../../../../src/application/controllers/factories/ControllerFactoryExpress'
import RegisterUseCase from '../../../../src/application/usecases/auth/RegisterUseCase'
import AuthVSchema from '../../../../src/interfaces/validators/schemas/AuthVSchema'
import ExpressJsendPresenter from '../../../../src/application/presenters/express/ExpressJsendPresenter'
import ErrorTranslator from '../../../../src/application/errors/ErrorTranslator'

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
        const localAuthVschema= {} as AuthVSchema
        const localExpressJsendPresenter= {} as ExpressJsendPresenter
        const localErrorTranslator= {} as ErrorTranslator
        createAuthSpy.mockImplementation((authSchemas: AuthVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) => {
            return new AuthControllerExpress(authSchemas, presenter, errorTranslator)
        })

        const authController = currentControllerFactory
            .createAuthController(localAuthVschema, localExpressJsendPresenter, localErrorTranslator)
        expect(authController).toBeInstanceOf(AuthControllerExpress)
        expect(currentControllerFactory
            .createAuthController(localAuthVschema, localExpressJsendPresenter, localErrorTranslator))
            .toEqual(authController)
        expect(currentControllerFactory
            .createAuthController({} as AuthVSchema, {} as ExpressJsendPresenter, {} as ErrorTranslator))
            .not.toBe(authController)
        expect(currentControllerFactory
            .createAuthController({} as AuthVSchema, {} as ExpressJsendPresenter, {} as ErrorTranslator))
            .toEqual(new AuthControllerExpress({} as AuthVSchema, {} as ExpressJsendPresenter, {} as ErrorTranslator))
        expect(currentControllerFactory
            .createAuthController({} as AuthVSchema, {} as ExpressJsendPresenter, {} as ErrorTranslator))
            .not.toBe(new AuthControllerExpress({} as AuthVSchema, {} as ExpressJsendPresenter, {} as ErrorTranslator))
        expect(createAuthSpy).toBeCalledTimes(5)
        expect(createAuthSpy).toBeCalledWith({} as AuthVSchema, {} as ExpressJsendPresenter, {} as ErrorTranslator)
        expect(createAuthSpy).toReturnWith(new AuthControllerExpress({} as AuthVSchema, {} as ExpressJsendPresenter, {} as ErrorTranslator))
    })
 })