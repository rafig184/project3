import { pool } from "../../database/"


async function getFollowersById(userId: number) {
    const query = "SELECT * FROM vacationsapp.followers where userId = ?"
    const results = await pool.execute(query, [userId]);
    const [data] = results;
    return data;
}

export { getFollowersById }
