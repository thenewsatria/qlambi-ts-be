import PrintMethod from "../../domain/entities/PrintMethod";

interface PrintMethodRepository {
    createPrintMethod(printMethod: PrintMethod): Promise<PrintMethod>
    readById(id: string, detailed: boolean): Promise<PrintMethod|null>
}

export default PrintMethodRepository