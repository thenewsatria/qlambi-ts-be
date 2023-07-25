interface ValidationMiddleware {
    checkFilesMimetype(allowedExt: string[]): (...args: any[]) => any
    checkFileSize(maxSize: number): (...args: any[]) => any
    checkFileIsExist(fieldName: string): (...args: any[]) => any
}

export default ValidationMiddleware