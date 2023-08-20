import { pool } from "../../database"

export interface IFollower {
    userId: number,
    vacationId: number,
}



async function addNewFollower(newFollower: IFollower) {
    const { userId, vacationId } = newFollower;
    const query = "`INSERT INTO `vacationsapp`.`followers` (`userId`, `vacationId`) VALUES (?,?)";
    const result = await pool.execute(query, [userId, vacationId]);
    const [data] = result;
    return data;
}

export { addNewFollower }