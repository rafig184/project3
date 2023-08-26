
import { pool } from "../../database/"


async function getAllFollowersReports() {
    const query = `SELECT 
    vacationsapp.vacations.destination,
    COUNT(vacationsapp.followers.vacationId) AS vacationCount
FROM
    vacationsapp.followers
        JOIN
    vacationsapp.vacations ON vacationsapp.followers.vacationId = vacationsapp.vacations.vacationId
GROUP BY vacationsapp.vacations.destination;`
    const results = await pool.execute(query);
    const [data] = results;
    console.log(` query data ==> ${data}`);

    return data;
}

export { getAllFollowersReports }




// SELECT v.vacationId, COUNT(f.vacationId) AS vacationCount, vac.destination
//     FROM vacationsapp.followers f
//     JOIN vacationsapp.vacations v ON f.vacationId = v.vacationId
//     JOIN vacationsapp.vacations vac ON v.vacationId = vac.vacationId
//     GROUP BY v.vacationId, vac.destination;