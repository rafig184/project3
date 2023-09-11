import axios from "axios";
import { urlApi } from "../../../../../App";

export interface IFollower {
    vacationId: number,
    amountOfFollowers: number,
    destionation: string
}

export interface IFollowerByUser {
    id: number,
    userId: number,
    vacationId: number
}

export interface IFollowerByVacationId {
    vacationId: number
    amountOfFollowers: number,
}

async function getFollowersReportService(): Promise<Array<IFollower>> {
    const { data, headers } = await axios.get(`${urlApi}/followers/reports`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    // console.log(data);
    return data;
}


async function getFollowersByUserIdService(): Promise<Array<IFollowerByUser>> {
    const { data, headers } = await axios.get(`${urlApi}/followers/user-id`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    // console.log(data);
    return data;
}


async function getFollowersCountByVacationIdService(): Promise<Array<IFollowerByVacationId>> {
    const { data, headers } = await axios.get(`${urlApi}/followers/followers-count`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    // console.log(data);
    return data;
}


async function addFollowService(vacationId: number) {
    const FollowerPayload: any = {
        vacationId,
    }
    console.log(FollowerPayload);
    try {
        const result = await axios.post(`${urlApi}/followers/new-follower`, FollowerPayload, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
        console.log(result);

    } catch (err) {
        alert("Something went wrong!")
        console.log(err);
    }
}


async function deleteFollowerService(vacationId: number) {
    const result = await axios.delete(`${urlApi}/followers/?q=${vacationId}`, {
        headers: {
            authorization: localStorage.getItem("token")
        }
    });
    if (result.status === 401) return new Error("Authorization error")
}




export { getFollowersReportService, addFollowService, deleteFollowerService, getFollowersByUserIdService, getFollowersCountByVacationIdService }