
import { pool } from "../../database/"


async function getAllFollowers() {
    const query = `SELECT vacationId, COUNT(vacationId) AS vacationCount
    FROM vacationsapp.vacations
    GROUP BY vacationId;`
    const results = await pool.execute(query);
    const [data] = results;
    return data;
}

export { getAllFollowers }


