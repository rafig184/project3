import { pool } from "../../database";

async function editVacation(destination: string, desc: string, startDate: Date, endDate: Date, price: number, image: string, vacationID: Number) {
    const query = `
    UPDATE vacationsapp.vacations
    SET destination = ?, description = ?, startDate = ? , endDate = ? , price = ? , image = ?
    WHERE vacationID = ?;
  `;

    const results = await pool.execute(query, [destination, desc, startDate, endDate, price, image, vacationID]);
    console.log(results);
    const [data] = results;
    return data;
}

export { editVacation };