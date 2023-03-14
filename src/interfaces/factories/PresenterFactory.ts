import JsendPresenter from "../presenters/JsendPresenter";

interface PresenterFactory {
    createJsendPresenter(): JsendPresenter
}

export default PresenterFactory
