interface Validator {
    validate<DataT>(schema: any, data: DataT): Promise<DataT>
}

export default Validator