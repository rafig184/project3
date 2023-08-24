
import { pool } from "../../database/"


async function getAllVacations() {
    const query = `SELECT * FROM vacationsapp.vacations ORDER BY startDate ASC;`
    const results = await pool.execute(query);
    const [data] = results;
    return data;
}

export { getAllVacations }


