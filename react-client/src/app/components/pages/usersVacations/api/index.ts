import axios from "axios"

export interface IVacations {
    vacationId: number,
    destination: string,
    description: string,
    startDate: string,
    endDate: string,
    price: number,
    image: string
}


async function getVacationsService(): Promise<Array<IVacations>> {

    const { data, headers } = await axios.get(`http://localhost:4000/vacations/`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    console.log(data);
    return data;
}




export { getVacationsService }