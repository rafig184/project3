import { pool } from "../../database";

async function editVacation(destination: string, description: string, startDate: Date, endDate: Date, price: number, image: string, vacationId: Number) {
  const query = "UPDATE `vacationsapp`.`vacations` SET `destination` = ?, `description` = ?, `startDate` = ?, `endDate` = ?, `price` = ?, `image` = ? WHERE (`vacationId` = ?);";
  const results = await pool.execute(query, [destination, description, startDate, endDate, price, image, vacationId]);
  console.log(results);
  const [data] = results;
  return data;
}

export { editVacation };