import { Button } from "primereact/button";
// import { Card } from 'primereact/card';
import { deleteVacationsService } from "../api";
import { useRef, useState } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useAppDispatch } from "../../../../hooks";

import { fetchVacationsAsync } from "../vacationSlice";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { WithLoading } from "../../../ui-components/withLoading";

export interface IVacationsAdmin {
    vacationId: number,
    destination: string,
    description: string,
    startDate: Date,
    endDate: Date,
    price: number,
    image: string,
}


export function AdminVacationCard(props: IVacationsAdmin) {
    const toast = useRef<Toast>(null);
    const [isVacationsLoading, setIsVacationsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const accept = () => {
        handleRemoveVacation()
    }

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "Something went wrong!", life: 3000 });
    }

    const confirm = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject,
        });
    };

    async function handleRemoveVacation() {
        try {
            setIsVacationsLoading(true)
            const result = await deleteVacationsService(props.vacationId);
            toast.current?.show({ severity: 'success', summary: 'Confirmed', detail: 'Vacation Deleted', life: 3000 });
            console.log(result)
            dispatch(fetchVacationsAsync())
        } catch (error) {
            showError()
            console.error(error);
        } finally {
            setIsVacationsLoading(false)
        }
    };

    function editHandler() {
        navigate(`/edit-vacation/?vid=${props.vacationId}`)
    }



    const formatedStartDate = format(new Date(props.startDate), "dd/MM/yyyy")
    const formatedEndtDate = format(new Date(props.endDate), "dd/MM/yyyy")



    // const header = (
    //     <div style={{ position: "relative" }}>
    //         <Image src={props.image} alt="Destination" style={{ height: "200px", width: "350px", borderRadius: "10px 10px 0 0" }} width="350" height="200" preview />
    //         <h2 style={{ position: "absolute", top: "10px", left: "10px", color: "white", zIndex: 1, textShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)" }}>{props.destination.toUpperCase()}</h2>
    //     </div>
    // );




    return <div style={{ margin: "2%" }}>
        <WithLoading isLoading={isVacationsLoading}>
            {/* <Card header={header} style={{ width: "350px", height: "560px" }}>

            </Card> */}
            <div style={{ backgroundColor: "#FFFFFF", height: "550px", borderRadius: "10px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" }}>
                <div style={{ position: "relative" }}>
                    <Image src={props.image} alt="Destination" style={{ height: "200px", width: "350px", borderRadius: "10px 10px 0 0" }} width="350" height="200" preview />
                    <h2 style={{ position: "absolute", top: "10px", left: "10px", color: "white", zIndex: 1, textShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)" }}>{props.destination.toUpperCase()}</h2>
                </div>
                <div style={{ marginTop: "-4%" }}>
                    <div style={{ borderBottomRightRadius: "10px" }}>
                        <div style={{ position: "relative", marginBottom: "1%", backgroundColor: "#B4E3FF", paddingTop: "2%", paddingBottom: "2%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", zIndex: 1 }}>
                            <span >
                                <i className={"pi pi-calendar"}></i><span> </span>
                                {formatedStartDate} - {formatedEndtDate}</span>
                        </div>
                        <ScrollPanel style={{ paddingLeft: "5%", textAlign: "left", position: "relative", marginTop: "-8px", width: '350px', height: '160px', backgroundColor: "#FFFFFF", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", zIndex: 2 }}>
                            <p>{props.description}</p>
                        </ScrollPanel>

                    </div>
                    <div style={{ borderRadius: "10px", padding: "1px", marginTop: "1%", backgroundColor: "#3B82F6", marginRight: "3%", marginLeft: "3%" }} >
                        <h3 style={{ color: "white" }}>{`${props.price} $`}</h3>
                    </div>
                    <Toast ref={toast} />
                    <div style={{ marginTop: "5%" }}>
                        <Button severity="danger" onClick={confirm} icon="pi pi-times" label="Delete" raised />
                        <Button onClick={editHandler} style={{ marginLeft: "4%" }} label="Edit" icon="pi pi-file-edit" severity="info" raised > </Button >
                    </div>
                </div>
            </div>

        </WithLoading>
    </div>

}


