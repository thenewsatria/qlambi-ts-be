import {Express, json} from 'express'

export function initMiddleware(app: Express) {
    app.use(json())
}