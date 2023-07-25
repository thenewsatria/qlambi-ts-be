import express, {Express} from 'express'
import SetupMiddleware from '../../../interfaces/middlewares/SetupMiddleware'

class SetupMiddlewareExpress implements SetupMiddleware {
    
    initialSetup(): any {
        return [express.json(), express.urlencoded({extended: true})]
    }
    setStaticFolder(destinationPath: string): (...args: any[]) => any {
        return express.static(destinationPath)
    }
}

export default SetupMiddlewareExpress
