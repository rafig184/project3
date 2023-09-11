const { expect } = require("chai")
const axios = require("axios")
const { getTokenForAdmin, getTokenForNonAdmin, getTokenForNonAdminFollowers } = require("./utils")

const urlApi = "http://localhost:4000"

describe("GET /reports/getFollowersReportService", function () {
    it("Get followers reports success ", async function () {
        const result = await axios.get(`${urlApi}/followers/reports`, {
            headers: {
                authorization: getTokenForAdmin()
            }
        })
        expect(result.status).equal(200)
    })
})

describe("GET /reports/getFollowersByUserIdService", function () {
    it("Get followers by userId success ", async function () {
        const result = await axios.get(`${urlApi}/followers/user-id`, {
            headers: {
                authorization: getTokenForNonAdminFollowers()
            }
        })
        expect(result.status).equal(200)
    })
})

describe("GET /reports/getFollowersCountByVacationIdService", function () {
    it("Get followers count by vacationId success ", async function () {
        const result = await axios.get(`${urlApi}/followers/followers-count`, {
            headers: {
                authorization: getTokenForNonAdmin()
            }
        })
        expect(result.status).equal(200)
    })
})

describe("POST /reports/addFollowService", function () {
    it("add follower success ", async function () {
        const FollowerPayload = {
            vacationId: 2
        }
        const result = await axios.post(`${urlApi}/followers/new-follower`, FollowerPayload, {
            headers: {
                authorization: getTokenForNonAdminFollowers()
            }
        })
        expect(result.status).equal(200)
    })

    it("add follower with bad request ", async function () {
        try {
            const FollowerPayload = {
                vacationId: "20"
            }
            const result = await axios.post(`${urlApi}/followers/new-follower`, FollowerPayload, {
                headers: {
                    authorization: getTokenForNonAdmin()
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

        const vacationId = 2
        const result = await axios.delete(`${urlApi}/followers/?q=${vacationId}`, {
            headers: {
                authorization: getTokenForNonAdminFollowers()
            }
        })
        expect(result.status).equal(200)
    })
})