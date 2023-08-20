// import axios from "axios"





// async function getVacationsService(): Promise<Array<IVacationsAdmin>> {
//     const { data, headers } = await axios.get(`http://localhost:4000/vacations/`, {
//         headers: {
//             authorization: localStorage.getItem("token")
//         }
//     })
//     if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
//     console.log(data);
//     return data;
// }

// async function deleteVacationsService(vacationId: number) {
//     const result = await axios.delete(`http://localhost:4000/vacations/${vacationId}`, {
//         headers: {
//             authorization: localStorage.getItem("token")
//         }
//     });
// }




// export { getVacationsService, deleteVacationsService }