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


    return <div className="mainVacation" >
        <div style={{ marginTop: "-4%" }}>
        </div>
        <WithLoading isLoading={isVacationsLoading}>
            <div style={{ backgroundColor: "#C0C0C0", color: "#495057", paddingTop: "1%", paddingBottom: "1%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                <Button onClick={() => { navigate("/add-vacation") }} severity="info" raised>Add new vacation</Button>
            </div>
            <div className="vacationsAdmin" >
                <ConfirmDialog />
                <AdminVacationList vacations={vacations} />
            </div>

        </WithLoading>
    </div>
}


