import axios from "axios";

export interface IFollowers {
    vacationId: number,
    vacationCount: number
}

async function getFollowersService(): Promise<Array<IFollowers>> {
    const { data, headers } = await axios.get(`http://localhost:4000/followers/`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    console.log(data);
    return data;
}

export { getFollowersService }