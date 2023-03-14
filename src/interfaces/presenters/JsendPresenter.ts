interface JsendPresenter {
    successReponse(...args: any[]): any
    failResponse(...args: any[]): any
    errorResponse(...args: any[]): any
}

export default JsendPresenter