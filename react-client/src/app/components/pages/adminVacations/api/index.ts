import axios from "axios"
import { IVacationsAdmin } from "../card";
import { urlApi } from "../../../../../App";



async function getVacationsService(): Promise<Array<IVacationsAdmin>> {

    const { data, headers } = await axios.get(`${urlApi}/vacations/`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    console.log(data);
    return data;
}

async function deleteVacationsService(vacationId: number) {
    const result = await axios.delete(`${urlApi}/vacations/${vacationId}`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    });
    if (result.status === 401) return new Error("Authorization error")
}


async function getVacationsByIdService(vacationId: number): Promise<Array<IVacationsAdmin>> {
    const { data, headers } = await axios.get(`${urlApi}/vacations/search?q=${vacationId}`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    console.log(data);
    return data;

}


export { getVacationsService, deleteVacationsService, getVacationsByIdService }