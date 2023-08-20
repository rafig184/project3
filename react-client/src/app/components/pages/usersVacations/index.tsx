
import { useEffect, useState } from "react"
import { IVacations, getVacationsService } from "./api"
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useNavigate } from "react-router-dom";
import VacationList from "./vacationsList";
import { useAppDispatch } from "../../../hooks";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { fetchVacationsAsync } from "../adminVacations/vacationSlice";



export default function UserVacationsPage() {
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

    const navigate = useNavigate()



    return <div>
        {/* <WithLoading isLoading={isCountriesLoading}> */}
        <VacationList vacations={vacations} />

        {/* </WithLoading> */}
    </div>
}


