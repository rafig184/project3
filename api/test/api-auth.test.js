const { expect } = require("chai")
const axios = require("axios")



describe("POST /auth/sign-up", function () {

    it("Create new user Success ", async function () {
        const dummyUser = {
            email: `email${Date.now()}@gmail.com`,
            firstName: "rafi",
            lastName: "ganon",
            password: "1234",
        }
        const result = await axios.post("http://localhost:4000/auth/sign-up", dummyUser)
        expect(result.status).equal(200)
    })
    it("Create new user  With bad request ", async function () {
        try {
            const dummyEmail = `email${Date.now()}@gmail.com`
            const dummyUser = {
                email: 222,
                firstName: "rafi",
                lastName: "ganon",
                password: "1234",
            }
            const result = await axios.post("http://localhost:4000/auth/sign-up", dummyUser)
            throw new Error("TEST FAIELD")
        } catch (error) {
            expect(error?.response.status).equal(400)
        }
    })
    it("Create new user User already exist ", async function () {
        try {
            const dummyEmail = `email${Date.now()}@gmail.com`
            const dummyUser = {
                email: dummyEmail,
                firstName: "rafi",
                lastName: "ganon",
                password: "1234",
            }
            const result1 = await axios.post("http://localhost:4000/auth/sign-up", dummyUser)
            const result2 = await axios.post("http://localhost:4000/auth/sign-up", dummyUser)
            throw new Error("TEST FAIELD")
        } catch (error) {
            expect(error?.response.status).equal(500)
        }
    })
})

describe("POST /auth/login", function () {
    it("Login new user Success ", async function () {
        const dummyUser = {
            email: `email${Date.now()}@gmail.com`,
            firstName: "rafi",
            lastName: "ganon",
            password: "1234",
        }
        await axios.post("http://localhost:4000/auth/sign-up", dummyUser)
        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: dummyUser.email, password: dummyUser.password })
        expect(typeof resultLogin.data.token).equal("string")
    })

})