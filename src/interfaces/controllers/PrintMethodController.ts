import CreatePrintMethodUseCase from "../../application/usecases/printMethod/CreatePrintMethodUseCase";

interface PrintMethodController {
    createPrintMethod(useCase: CreatePrintMethodUseCase): (...args: any[]) => any
}

export default PrintMethodController