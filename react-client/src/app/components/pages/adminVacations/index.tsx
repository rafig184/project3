
import { useEffect, useState } from "react"

import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useNavigate } from "react-router-dom";
import VacationList from "./vacationsList";
import AdminVacationList from "./vacationsList";
import { IVacationsAdmin } from "./card";
import { getVacationsService } from "./api";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchVacationsAsync } from "./vacationSlice";
import { useAppDispatch } from "../../../hooks";



export default function AdminVacationsPage() {

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

    // const [isGroupsLoading, setIsGroupsLoading] = useState(false)
    const navigate = useNavigate()
    // async function getVacationsAction() {
    //     try {
    //         // setIsGroupsLoading(true)
    //         const result = await getVacationsService()
    //         setVacations(result)
    //     } catch (error) {
    //         alert("error")
    //         navigate("/login")
    //     } finally {
    //         // setIsGroupsLoading(false)
    //     }

    // }

    // useEffect(() => {
    //     getVacationsAction()
    //     return () => {
    //         console.log("Unmount!")
    //     }
    // }, [])



    return <div>
        {/* <WithLoading isLoading={isCountriesLoading}> */}
        <Button onClick={() => { navigate("/add-vacation") }} severity="info" raised>Add new vacation</Button>
        <ConfirmDialog />
        <AdminVacationList vacations={vacations} />

        {/* </WithLoading> */}
    </div>
}


