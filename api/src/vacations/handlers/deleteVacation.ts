import { pool } from "../../database";

async function removeVacation(vacationId: number) {
    const query = `DELETE FROM vacationsapp.vacations WHERE vacationId = ?`;
    const results = await pool.execute(query, [vacationId]);
    return results;
}
export { removeVacation };