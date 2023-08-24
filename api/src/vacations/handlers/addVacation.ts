
import { pool } from "../../database"



async function addVacation(destination: string, description: string, startDate: Date, endDate: Date, price: number, image: string) {
    // const { destination, description, startDate, endDate, price, image } = newVacation;
    const query = "INSERT INTO `vacationsapp`.`vacations`(`destination`,`description`,`startDate`,`endDate`,`price`,`image`) VALUES(?,?,?,?,?,?);"
    const results = await pool.execute(query, [destination, description, startDate, endDate, price, image]);
    const [data] = results;

    return data;
}
export { addVacation }
