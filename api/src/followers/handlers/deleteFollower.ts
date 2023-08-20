import { pool } from "../../database";
import { IFollower } from "./addNewFollower";

async function removeFollower(follower: IFollower) {
    const { vacationId, userId } = follower
    const query = `DELETE FROM vacationsapp.followers WHERE vacationId = ? AND userId = ?`;
    const results = await pool.execute(query, [vacationId, userId]);
    return results;
}
export { removeFollower };