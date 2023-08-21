
import { useCallback, useEffect, useState } from "react"
import { IVacations, getVacationsService } from "./api"
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useNavigate } from "react-router-dom";
import VacationList from "./vacationsList";
import { useAppDispatch } from "../../../hooks";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { fetchVacationsAsync } from "../adminVacations/vacationSlice";
import { Checkbox } from 'primereact/checkbox';


export default function UserVacationsPage() {
    const [futureChecked, setfutureChecked] = useState<boolean>(false);
    const [followingChecked, setFollowingChecked] = useState<boolean>(false);
    const [filteredVacations, setFilteredVacations] = useState<IVacations[]>([]);

    const handlerFutureChecked = useCallback((e: any) => {
        setfutureChecked(e.checked)
    }, [futureChecked])

    const handlerFollowingChecked = useCallback((e: any) => {
        setFollowingChecked(e.checked)
    }, [followingChecked])

    const currentDate = new Date()

    const dispatch = useAppDispatch();
    const vacations = useSelector((state: RootState) => state.vacations.vacationsData);




    useEffect(() => {
        try {
            dispatch(fetchVacationsAsync());

        } catch (error) {
            alert("error")
            navigate("/login")
        }
    }, [dispatch]);

    useEffect(() => {
        if (futureChecked) {
            const futureVacations = vacations.filter(vacation => {
                const startDate = new Date(vacation.startDate);
                return startDate > currentDate;
            });
            console.log("Filtered Vacations:", futureVacations);
            setFilteredVacations(futureVacations);
        } else {
            setFilteredVacations(vacations);
        }
    }, [vacations, futureChecked]);

    const navigate = useNavigate()



    return <div>
        {/* <WithLoading isLoading={isCountriesLoading}> */}
        <div style={{ backgroundColor: "#C0C0C0", color: "#495057", display: "flex", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} className="card flex justify-content-center">
            <div style={{ margin: "auto" }}>
                <Checkbox onChange={handlerFutureChecked} checked={futureChecked}></Checkbox>
                <label htmlFor="ingredient1" className="ml-2">Show only future vacations</label>
            </div>
            <div style={{ margin: "auto" }}>
                <Checkbox onChange={handlerFollowingChecked} checked={followingChecked}></Checkbox>
                <label htmlFor="ingredient1" className="ml-2">Show only my following vacations</label>
            </div>
        </div>
        <div style={{ backgroundColor: "#EFF3F8" }}>
            <VacationList vacations={filteredVacations} />
        </div>

        {/* </WithLoading> */}
    </div>
}


