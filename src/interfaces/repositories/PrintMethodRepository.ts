import PrintMethod from "../../domain/entities/PrintMethod";

interface PrintMethodRepository {
    createPrintMethod(printMethod: PrintMethod): Promise<PrintMethod>
}

export default PrintMethodRepository