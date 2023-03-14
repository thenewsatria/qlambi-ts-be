import JsendPresenter from "../../../interfaces/presenters/JsendPresenter";
import { Response } from "express";

class ExpressJsendPresenter implements JsendPresenter{
    private static instance: ExpressJsendPresenter
    public static getInstance(): ExpressJsendPresenter {
        if(!ExpressJsendPresenter.instance) {
            ExpressJsendPresenter.instance = new ExpressJsendPresenter()
        }

        return ExpressJsendPresenter.instance
    }

    successReponse<DataT>(carrier: Response, statusCode: number, payload: DataT): Response {
        return carrier.status(statusCode).json({
            status: "success",
            data: payload
        })
    }

    failResponse<DataT>(carrier: Response, statusCode: number, payload: DataT): Response {
        return carrier.status(statusCode).json({
            status: "fail",
            data: payload
        })
    }

    errorResponse<DataT>(carrier: Response, statusCode: number, payload: DataT): Response {
        return carrier.status(statusCode).json({
            status: "error",
            message: payload
        })
    }
}

export default ExpressJsendPresenter