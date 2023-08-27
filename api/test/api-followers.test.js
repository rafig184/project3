const { expect } = require("chai")
const axios = require("axios")



describe("GET /reports/getFollowersReportService", function () {
    it("Get followers reports success ", async function () {

        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "root@root.com", password: "admin" })

        const token = resultLogin.data.token
        const result = await axios.get(`http://localhost:4000/followers/reports`, {
            headers: {
                authorization: token
            }
        })
        expect(result.status).equal(200)
    })
})

describe("GET /reports/getFollowersByUserIdService", function () {
    it("Get followers by userIs success ", async function () {
        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "root@root.com", password: "admin" })

        const token = resultLogin.data.token

        const result = await axios.get(`http://localhost:4000/followers/user-id`, {
            headers: {
                authorization: token
            }
        })
        expect(result.status).equal(200)
    })
})

describe("GET /reports/getFollowersCountByVacationIdService", function () {
    it("Get followers count by vacationId success ", async function () {

        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "rafi@rafi.com", password: "rafi" })

        const token = resultLogin.data.token

        const result = await axios.get(`http://localhost:4000/followers/followers-count`, {
            headers: {
                authorization: token
            }
        })
        expect(result.status).equal(200)
    })
})

describe("POST /reports/addFollowService", function () {
    it("add follower success ", async function () {

        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "rafi@rafi.com", password: "rafi" })
        const token = resultLogin.data.token

        const FollowerPayload = {
            vacationId: 14
        }
        const result = await axios.post("http://localhost:4000/followers/new-follower", FollowerPayload, {
            headers: {
                authorization: token
            }
        })
        expect(result.status).equal(200)
    })

    it("add follower with bad request ", async function () {
        try {
            const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "rafi@rafi.com", password: "rafi" })
            const token = resultLogin.data.token

            const FollowerPayload = {
                vacationId: "20"
            }
            const result = await axios.post("http://localhost:4000/followers/new-follower", FollowerPayload, {
                headers: {
                    authorization: token
                }
            })
            throw new Error("TEST FAIELD")
        } catch (error) {
            expect(error?.response.status).equal(400)
        }
    })
})

describe("DELETE /reports/deleteFollowerService", function () {
    it("delete follower success ", async function () {

        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "rafi@rafi.com", password: "rafi" })
        const token = resultLogin.data.token

        const vacationId = 14
        const result = await axios.delete(`http://localhost:4000/followers/?q=${vacationId}`, {
            headers: {
                authorization: token
            }
        })
        expect(result.status).equal(200)
    })
})