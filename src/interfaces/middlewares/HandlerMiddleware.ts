import JsendPresenter from "../presenters/JsendPresenter";

interface HandlerMiddleware {
    handleErrors(presenter: JsendPresenter): (...args: any[]) => any
}

export default HandlerMiddleware