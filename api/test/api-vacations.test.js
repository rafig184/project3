const { expect } = require("chai")
const axios = require("axios")



describe("GET /vacations/getAllVacations", function () {
    it("Get all vacation Success ", async function () {

        const result = await axios.get("http://localhost:4000/vacations/")
        expect(result.status).equal(200)
    })
})

describe("POST /vacations/new-vacation", function () {

    it("Create new vacation Success ", async function () {
        const dummyVacation = {
            destination: "thailand",
            startDate: new Date(),
            endDate: new Date(),
            price: 1000,
            description: "blabla",
            image: "test.jpg"

        }
        const result = await axios.post("http://localhost:4000/vacations/new-vacation", dummyVacation)
        expect(result.status).equal(200)
    })

    it("Create new vacation  With bad request ", async function () {
        try {
            const dummyVacation = {
                destination: "thailand",
                startDate: new Date(),
                endDate: new Date(),
                price: "1000",
                description: "blabla",
                image: "test.jpg"
            }
            const result = await axios.post("http://localhost:4000/auth/sign-up", dummyVacation)
            throw new Error("TEST FAIELD")
        } catch (error) {
            expect(error?.response.status).equal(400)
        }
    })
})
