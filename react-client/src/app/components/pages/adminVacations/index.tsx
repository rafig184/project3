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
            <div className="addNewVacationDiv">
                <button className="buttons" onClick={() => { navigate("/add-vacation") }} >Add new vacation</button>
            </div>
            <div className="vacations" >
                <ConfirmDialog />
                <AdminVacationList vacations={vacations} />
            </div>

        </WithLoading>
    </div>
}


