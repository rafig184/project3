const { expect } = require("chai")
const axios = require("axios")
const { deleteUserTest } = require("./utils")


describe("POST /auth/sign-up", function () {

    it("Create new user Success ", async function () {
        const dummyUser = {
            email: `email${Date.now()}@gmail.com`,
            firstName: "testUser",
            lastName: "testUser",
            password: "1234",
        }
        const result = await axios.post("http://localhost:4000/auth/sign-up", dummyUser)
        expect(result.status).equal(200)
        await deleteUserTest(dummyUser.email)
    })
    it("Create new user  With bad request ", async function () {
        try {
            const dummyUser = {
                email: 222,
                firstName: "testUser",
                lastName: "testUser",
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
            const dummyUser = {
                email: "root@root.com",
                firstName: "admin",
                lastName: "admin",
                password: "admin",
            }
            const result = await axios.post("http://localhost:4000/auth/sign-up", dummyUser)
        } catch (error) {
            console.log(error);
            expect(error?.response.status).equal(409)
        }
    })
})

describe("POST /auth/login", function () {
    it("Login new user Success ", async function () {
        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "root@root.com", password: "admin" })
        expect(typeof resultLogin.data.token).equal("string")
    })
})