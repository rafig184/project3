import axios from "axios"
import { IVacationsAdmin } from "../card";



async function getVacationsService(): Promise<Array<IVacationsAdmin>> {
    console.log(localStorage.getItem("token"));

    const { data, headers } = await axios.get(`http://localhost:4000/vacations/`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    console.log(data);
    return data;
}

async function deleteVacationsService(vacationId: number) {
    const result = await axios.delete(`http://localhost:4000/vacations/${vacationId}`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    });
    if (result.status === 401) return new Error("Authorization error")
}


async function getVacationsByIdService(vacationId: number): Promise<Array<IVacationsAdmin>> {
    const { data, headers } = await axios.get(`http://localhost:4000/vacations/search?q=${vacationId}`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    console.log(data);
    return data;

}


export { getVacationsService, deleteVacationsService, getVacationsByIdService }