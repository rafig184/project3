
import { pool } from "../../database"



async function addVacation(destination: string, desc: string, startDate: string, endDate: string, price: number, image: string) {
    // const { destination, desc, startDate, endDate, price, image } = newVacation;
    const query = "INSERT INTO `vacationsapp`.`vacations`(`destination`,`desc`,`startDate`,`endDate`,`price`,`image`) VALUES(?,?,?,?,?,?);"
    const results = await pool.execute(query, [destination, desc, startDate, endDate, price, image]);
    const [data] = results;

    return data;
}
export { addVacation }
