interface ErrorTranslator {
    translateError(error: Error): Error
}

export default ErrorTranslator