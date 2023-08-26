import { pool } from "../../database";


async function removeFollower(vacationId: number, userId: number) {
    const query = `DELETE FROM vacationsapp.followers WHERE vacationId = ? AND userId = ?`;
    const results = await pool.execute(query, [vacationId, userId]);
    return results;
}
export { removeFollower };