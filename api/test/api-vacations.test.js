const { expect } = require("chai")
const axios = require("axios")
const { getTokenForAdmin, getTokenForNonAdmin, deleteVacationTest, insertVacationTest } = require("./utils")

const urlApi = "http://localhost:4000"


describe("GET /vacations/getAllVacations", function () {
    it("Get all vacation Success ", async function () {
        const result = await axios.get(`${urlApi}/vacations`, {
            headers: {
                authorization: getTokenForNonAdmin()
            }
        })
        expect(result.status).equal(200)
    })
})

describe("POST /vacations/new-vacation", function () {

    it("Create new vacation Success ", async function () {

        const dummyVacation = {
            destination: "thailand222",
            startDate: new Date(),
            endDate: new Date(),
            price: 1000,
            description: "blabla",
            image: "test.jpg"

        }
        const result = await axios.post(`${urlApi}/vacations/new-vacation`, dummyVacation, {
            headers: {
                authorization: getTokenForAdmin()
            }
        })
        expect(result.status).equal(200)
        await deleteVacationTest("thailand222")
    })

    it("Create new vacation  With bad request ", async function () {
        try {
            const dummyVacation = {
                destination: "TEST",
                startDate: new Date(),
                endDate: new Date(),
                price: "1000",
                description: "blabla",
                image: "test.jpg"
            }
            const result = await axios.post(`${urlApi}/vacations/new-vacation`, dummyVacation)
            throw new Error("TEST FAIELD")
        } catch (error) {
            expect(error?.response.status).equal(401)
        }
    })
})


describe("DELETE /adminVacations/deleteVacationsService", function () {
    it("delete vacation with bad request ", async function () {
        try {
            const vacationId = "100"
            const result = await axios.delete(`${urlApi}/vacations/${vacationId}`, {
                headers: {
                    authorization: getTokenForAdmin()
                }
            })
        } catch (error) {
            expect(error?.response.status).equal(401)
        }
    })

    it("Delete vacation success ", async function () {
        await insertVacationTest()
        const vacationId = "666"
        const result = await axios.delete(`${urlApi}/vacations/${vacationId}`, {
            headers: {
                authorization: getTokenForAdmin()
            }
        })
        expect(result.status).equal(200)
    })


})

describe("PUT /vacations/edit-vacation", function () {

    it("Edit vacation Success ", async function () {
        await insertVacationTest()
        const dummyVacation = {
            destination: "thailandTest",
            startDate: new Date(),
            endDate: new Date(),
            price: 1000,
            description: "blabla",
            image: "test.jpg",
        }
        const result = await axios.put(`${urlApi}/vacations/edit-vacation?q=${666}`, dummyVacation, {
            headers: {
                authorization: getTokenForAdmin()
            }
        })
        expect(result.status).equal(200)
        await deleteVacationTest("thailandTest")
    })

    it("Edit vacation With bad request ", async function () {
        try {
            const dummyVacation = {
                destination: "TEST",
                startDate: new Date(),
                endDate: new Date(),
                price: "1000",
                description: "blabla",
                image: "test.jpg"
            }
            const result = await axios.post(`${urlApi}/vacations/edit-vacation`, dummyVacation)
            throw new Error("TEST FAIELD")
        } catch (error) {
            expect(error?.response.status).equal(401)
        }
    })
})
