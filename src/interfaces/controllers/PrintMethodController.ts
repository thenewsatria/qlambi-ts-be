import CreatePrintMethodUseCase from "../../application/usecases/printMethod/CreatePrintMethodUseCase";
import GetPrintMethodDetailUseCase from "../../application/usecases/printMethod/GetPrintMethodDetailUseCase";

interface PrintMethodController {
    createPrintMethod(useCase: CreatePrintMethodUseCase): (...args: any[]) => any
    getPrintMethodDetail(useCase: GetPrintMethodDetailUseCase): (...args: any[]) => any
}

export default PrintMethodController