
import { pool } from "../../database/"


async function getVacationById(vacationId: number) {
    const query = `SELECT * FROM vacationsapp.vacations WHERE vacationId = ?;`
    const results = await pool.execute(query, [vacationId]);
    const [data] = results;
    console.log(data);

    return data;
}

export { getVacationById }


