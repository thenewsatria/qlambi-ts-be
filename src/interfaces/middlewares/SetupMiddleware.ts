interface SetupMiddleware {
    initialSetup(): (...args: any[]) => any
    setStaticFolder(destinationPath: string): (...args: any[]) => any
}

export default SetupMiddleware