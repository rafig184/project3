
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


    const navigate = useNavigate()


    return <div >
        {/* <WithLoading isLoading={isCountriesLoading}> */}
        <div style={{ backgroundColor: "#C0C0C0", color: "#495057", paddingTop: "1%", paddingBottom: "1%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
            <Button onClick={() => { navigate("/add-vacation") }} severity="info" raised>Add new vacation</Button>
        </div>
        <div style={{ backgroundColor: "#EFF3F8", color: "#495057", display: "flex" }}>
            <ConfirmDialog />
            <AdminVacationList vacations={vacations} />
        </div>

        {/* </WithLoading> */}
    </div>
}


