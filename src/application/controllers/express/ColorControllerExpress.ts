import ColorController from "../../../interfaces/controllers/ColorController";
import ErrorTranslator from "../../../interfaces/errors/ErrorTranslator";
import ColorVSchema from "../../../interfaces/validators/schemas/ColorVSchema";
import ExpressJsendPresenter from "../../presenters/express/ExpressJsendPresenter";
import AddColorUseCase from "../../usecases/color/AddColorUseCase";

class ColorControllerExpress implements ColorController{
    private colorSchemas: ColorVSchema
    private presenter: ExpressJsendPresenter
    private errorTranslator: ErrorTranslator

    constructor(colorSchemas: ColorVSchema, presenter: ExpressJsendPresenter, errorTranslator: ErrorTranslator) {
        this.colorSchemas = colorSchemas
        this.presenter = presenter
        this.errorTranslator = errorTranslator
    }
    
    addProduct(useCase: AddColorUseCase): (...args: any[]) => any {
        throw new Error("Method not implemented.");
    }   
}

export default ColorControllerExpress