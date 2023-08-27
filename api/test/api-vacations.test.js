const { expect } = require("chai")
const axios = require("axios")




describe("GET /vacations/getAllVacations", function () {
    it("Get all vacation Success ", async function () {


        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "root@root.com", password: "admin" })
        const token = resultLogin.data.token

        const result = await axios.get(`http://localhost:4000/vacations`, {
            headers: {
                authorization: token
            }
        })
        expect(result.status).equal(200)
    })
})

describe("POST /vacations/new-vacation", function () {

    it("Create new vacation Success ", async function () {

        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "root@root.com", password: "admin" })
        const token = resultLogin.data.token

        const dummyVacation = {
            destination: "thailand",
            startDate: new Date(),
            endDate: new Date(),
            price: 1000,
            description: "blabla",
            image: "test.jpg"

        }
        const result = await axios.post("http://localhost:4000/vacations/new-vacation", dummyVacation, {
            headers: {
                authorization: token
            }
        })
        expect(result.status).equal(200)
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
            const result = await axios.post("http://localhost:4000/auth/sign-up", dummyVacation)
            throw new Error("TEST FAIELD")
        } catch (error) {
            expect(error?.response.status).equal(400)
        }
    })
})


describe("DELETE /adminVacations/deleteVacationsService", function () {
    // it("delete vacation with bad request ", async function () {
    //     try {
    //         const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "root@root.com", password: "admin" })
    //         const token = resultLogin.data.token

    //         const vacationId = "100"
    //         const result = await axios.delete(`http://localhost:4000/vacations/${vacationId}`, {
    //             headers: {
    //                 authorization: token
    //             }
    //         })
    //         if (result.status !== 400) {
    //             throw new Error("Request should have failed with status 400");
    //         }
    //     } catch (error) {
    //         console.error("Test error:", error);
    //         throw error;
    //     }
    // })

    it("delete vacation success ", async function () {

        const resultLogin = await axios.post("http://localhost:4000/auth/login", { email: "root@root.com", password: "admin" })
        const token = resultLogin.data.token

        const vacationId = 10
        const result = await axios.delete(`http://localhost:4000/vacations/${vacationId}`, {
            headers: {
                authorization: token
            }
        })
        expect(result.status).equal(200)
    })


})