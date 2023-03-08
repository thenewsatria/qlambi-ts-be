import express, {Express}from 'express'

export function initMiddleware(app: Express) {
    app.use(express.json())
}