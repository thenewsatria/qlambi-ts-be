import request from "supertest"
import app from "../../../../src/api/express/app"

describe('Auth Routes', () => { 
    let currentPath: string = "/api/v1/auth"
    let response: request.Response
    const client = request(app)
    describe('signin', () => {
        beforeAll(() => {
            // Seed database with testing data
        })
        afterAll(() => {
            // Remove testing data from the database
        })
        it("Should return 404 when accessed using different method", async() => {
            response = await client.get(`${currentPath}/signin`)
            expect(response.statusCode).toBe(404)
            response = await client.patch(`${currentPath}/signin`)
            expect(response.statusCode).toBe(404)
            response = await client.put(`${currentPath}/signin`)
            expect(response.statusCode).toBe(404)
            response = await client.delete(`${currentPath}/signin`)
            expect(response.statusCode).toBe(404)
        })

        it("Should returning correct response body when posting a correct input", async()=> {
            response = await client.post(`${currentPath}/signin`)
                .send()
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200)
            expect(response.header['content-type']).toContain('application/json')
            expect(response.body).toHaveProperty('status', 'success')
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toHaveProperty('accessToken')
            expect(response.body.data).toHaveProperty('refreshToken')
        })
        
        describe("Validation handling", () => {
            it("Should return correct response when credential is false (username)", async() => {
                const postBody = {
                    // wrong username
                    credential: "wusernamefortest",
                    password: "passwordfortest"
                }
                response = await client.post(`${currentPath}/signin`)
                    .send(postBody)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                
                expect(response.statusCode).toBe(401)
                expect(response.header['content-type']).toContain('application/json')
                expect(response.body).toHaveProperty('status')
                expect(response.body).toHaveProperty('data')
                expect(response.body.data).toHaveProperty('message', "Username or email and password provided is incorrect")
            })

            it("Should return correct response when credential is false (email)", async() => {
                const postBody = {
                    // wrong username
                    credential: "wemailfortest@testing.com",
                    password: "passwordfortest"
                }
                response = await client.post(`${currentPath}/signin`)
                    .send(postBody)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                
                expect(response.statusCode).toBe(401)
                expect(response.header['content-type']).toContain('application/json')
                expect(response.body).toHaveProperty('status')
                expect(response.body).toHaveProperty('data')
                expect(response.body.data).toHaveProperty('message', "Username or email and password provided is incorrect")
            })

            it("Should return correct response when password is false", async() => {
                const postBody = {
                    // wrong username
                    credential: "usernamefortest",
                    password: "wpasswordfortest"
                }
                response = await client.post(`${currentPath}/signin`)
                    .send(postBody)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                
                expect(response.statusCode).toBe(401)
                expect(response.header['content-type']).toContain('application/json')
                expect(response.body).toHaveProperty('status')
                expect(response.body).toHaveProperty('data')
                expect(response.body.data).toHaveProperty('message', "Username or email and password provided is incorrect")
            })
        })
     })
 })