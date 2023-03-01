import app from '../../../src/frameworks/web/app';
import request from 'supertest'

describe("Express App", () => {
    
    describe("GET on '/'", () => {
        let response: request.Response
        
        beforeAll(async() => {
            response = await request(app).get("/")
        })

        it("Should response 200 OK",  async () => {
            expect(response.statusCode).toEqual(200)
        })
        it("Should have json response",  async () => {
            expect(response.header['content-type']).toContain('application/json')
        })
        it("Should have expected json body",  async () => {
            expect(response.body).toEqual({
                status: "ok"
            })
        })
     })
})