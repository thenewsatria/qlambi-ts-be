interface SetupMiddleware {
    initialSetup(): (...args: any[]) => any
}

export default SetupMiddleware