interface Validator {
    validate<DataT>(schema: any, data: DataT): Promise<DataT>
    isValid<DataT>(schema: any, data: DataT): Promise<Boolean>
}

export default Validator