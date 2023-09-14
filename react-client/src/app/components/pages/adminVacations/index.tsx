import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AdminVacationList from "./vacationsList";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchVacationsAsync } from "./vacationSlice";
import { useAppDispatch } from "../../../hooks";
import { WithLoading } from "../../ui-components/withLoading";



export default function AdminVacationsPage() {

    const dispatch = useAppDispatch();
    const vacations = useSelector((state: RootState) => state.vacations.vacationsData);
    const [isVacationsLoading, setIsVacationsLoading] = useState(false)

    useEffect(() => {
        try {
            setIsVacationsLoading(true)
            dispatch(fetchVacationsAsync());
        } catch (error) {
            alert("error")
            navigate("/login")
        } finally {
            setIsVacationsLoading(false)
        }
    }, []);


    const navigate = useNavigate()


    return <div className="mainVacation" id="adminVacation" >
        <WithLoading isLoading={isVacationsLoading}>
            <div style={{ marginTop: "-4%" }}>
            </div>
            <div className="addNewVacationDiv">
                <Button icon="pi pi-plus" rounded severity="info" aria-label="Add Vacation" onClick={() => { navigate("/add-vacation") }} /> <span className="addV">Add new vacation</span>
            </div>
            <div className="vacations" >
                <ConfirmDialog />
                <AdminVacationList vacations={vacations} />
            </div>

        </WithLoading>
    </div>
}


