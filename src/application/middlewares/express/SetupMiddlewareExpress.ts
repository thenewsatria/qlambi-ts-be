import express, {Express} from 'express'
import SetupMiddleware from '../../../interfaces/middlewares/SetupMiddleware'

class SetupMiddlewareExpress implements SetupMiddleware {  
    initialSetup(): any {
        return [express.json()]
    }

}

export default SetupMiddlewareExpress
