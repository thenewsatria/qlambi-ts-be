import PresenterFactory from "../../../interfaces/factories/PresenterFactory";
import JsendPresenter from "../../../interfaces/presenters/JsendPresenter";
import ExpressJsendPresenter from "../express/ExpressJsendPresenter";

class ExpressPresenterFactory implements PresenterFactory{
    private static instance: ExpressPresenterFactory
    public static getInstance(): ExpressPresenterFactory {
        if(!ExpressPresenterFactory.instance) {
            ExpressPresenterFactory.instance = new ExpressPresenterFactory()
        }

        return ExpressPresenterFactory.instance
    }

    createJsendPresenter(): JsendPresenter {
        return ExpressJsendPresenter.getInstance()
    }
}

export default ExpressPresenterFactory