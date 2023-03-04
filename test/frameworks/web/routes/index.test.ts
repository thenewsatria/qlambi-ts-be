import request from "supertest"
import app from "../../../../src/frameworks/web/app"

describe('Routes', () => { 
    describe('API Routes', () => { 
        describe('V1 Routes', () => {
            let response: request.Response
            beforeAll(async() => {
                response = await request(app).get('/api/v1')
            }) 

            it("Should return 200 OK on GET '/api/v1", () => {
                expect(response.statusCode).toEqual(200)    
            })

            it("Should have json response",  async () => {
                expect(response.header['content-type']).toContain('application/json')
            })

            it("Should have expected json body",  async () => {
                expect(response.body).toEqual({
                    status: "API version 1 ok"
                })
            })
         })
     })
 })