
import { pool } from "../../database/"


async function getAllFollowersReports() {
    const query = `SELECT 
    vacationsapp.vacations.destination,
    COUNT(vacationsapp.followers.vacationId) AS amountOfFollowers
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




