import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import { deleteVacationsService } from "../api";
import { useEffect, useRef } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useAppDispatch } from "../../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { fetchVacationsAsync } from "../vacationSlice";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import EditVacationPage from "../editVacation";


export interface IVacationsAdmin {
    vacationId: number,
    destination: string,
    desc: string,
    startDate: Date,
    endDate: Date,
    price: number,
    image: string
}


export function AdminVacationCard(props: IVacationsAdmin) {
    const toast = useRef<Toast>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const accept = () => {
        toast.current?.show({ severity: 'success', summary: 'Confirmed', detail: 'Vacation Deleted', life: 3000 });
        handleRemoveVacation()
    }

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    async function handleRemoveVacation() {
        try {
            const result = await deleteVacationsService(props.vacationId);
            console.log(result)
            dispatch(fetchVacationsAsync())
        } catch (error) {
            console.error(error);
        }
    };

    function editHandler() {
        navigate("/edit-vacation")

    }

    const formatedStartDate = format(new Date(props.startDate), "dd/MM/yyyy")
    const formatedEndtDate = format(new Date(props.endDate), "dd/MM/yyyy")



    const header = (
        <div style={{ position: "relative" }}>
            <Image src={props.image} alt="Destination" style={{ height: "200px", width: "350px", borderRadius: "10px 10px 0 0" }} width="350" height="200" preview />
            <h2 style={{ position: "absolute", top: "10px", left: "10px", color: "white", zIndex: 1, textShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)" }}>{props.destination.toUpperCase()}</h2>
        </div>
    );


    return <div style={{ margin: "2%" }}>
        <Card header={header} style={{ width: "350px", height: "550px" }}>
            <div style={{ backgroundColor: "grey", borderRadius: "10px" }}>
                <div style={{ backgroundColor: "#495057", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                    <span style={{ color: "white" }}>{formatedStartDate} - {formatedEndtDate}</span>
                </div>
                <div style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                    <h3 style={{ color: "black" }}>{`${props.price} $`}</h3>
                </div>
                <ScrollPanel style={{ width: '100%', height: '120px', backgroundColor: "silver", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} className="custombar1">
                    <p>{props.desc}</p>
                </ScrollPanel>
            </div>
            <Toast ref={toast} />

            <div style={{ marginTop: "5%" }}>
                <Button severity="danger" onClick={confirm} icon="pi pi-times" label="Delete" raised />
                <Button onClick={editHandler} style={{ marginLeft: "4%" }} label="Edit" icon="pi pi-file-edit" severity="info" raised />
            </div>


        </Card>
    </div>

}
