
import { pool } from "../../database/"


async function getAllFollowers() {
    const query = `SELECT v.vacationId, COUNT(f.vacationId) AS vacationCount, vac.destination
    FROM vacationsapp.followers f
    JOIN vacationsapp.vacations v ON f.vacationId = v.vacationId
    JOIN vacationsapp.vacations vac ON v.vacationId = vac.vacationId
    GROUP BY v.vacationId, vac.destination;`
    const results = await pool.execute(query);
    const [data] = results;
    console.log(` query data ==> ${data}`);

    return data;
}

export { getAllFollowers }


// SELECT vacationId, COUNT(vacationId) AS vacationCount
//     FROM vacationsapp.followers
//     GROUP BY vacationId;