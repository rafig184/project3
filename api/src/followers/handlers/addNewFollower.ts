import { pool } from "../../database"




async function addNewFollower(userId: number, vacationId: number) {
    const query = "INSERT INTO`vacationsapp`.`followers`(`userId`, `vacationId`) VALUES( ?, ?);";;
    const result = await pool.execute(query, [userId, vacationId]);
    const [data] = result;
    return data;
}

export { addNewFollower }