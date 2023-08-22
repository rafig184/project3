import { Button } from "primereact/button";
import { IVacations } from "../api";
import { Card } from 'primereact/card';
import { ScrollPanel } from "primereact/scrollpanel";
import { ToggleButton } from 'primereact/togglebutton';
import { useState } from "react";
import { Image } from "primereact/image";
import { format } from "date-fns";

export function VacationCard(props: IVacations) {
    const [checked, setChecked] = useState(false);

    const header = (
        <div style={{ position: "relative" }}>
            <Image src={props.image} alt="Destination" style={{ height: "200px", width: "350px", borderRadius: "10px 10px 0 0" }} width="350" height="200" preview />
            <h2 style={{ position: "absolute", top: "10px", left: "10px", color: "white", zIndex: 1, textShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)" }}>{props.destination.toUpperCase()}</h2>
        </div>
    );
    const footer = (
        <div className="flex flex-wrap justify-content-left gap-2">
            <Button label="" icon="pi pi-heart" severity="danger" />
        </div>
    );

    const formatedStartDate = format(new Date(props.startDate), "dd/MM/yyyy")
    const formatedEndtDate = format(new Date(props.endDate), "dd/MM/yyyy")


    return <div style={{ margin: "2%" }}>
        <Card header={header} style={{ width: "350px", height: "550px" }}>
            <div style={{ backgroundColor: "grey", borderRadius: "10px" }}>
                <div style={{ backgroundColor: "#B4E3FF", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                    <span style={{ color: "#55758F" }}>{formatedStartDate} - {formatedEndtDate}</span>
                </div>
                <div style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                    <h3 style={{ color: "black" }}>{`${props.price} $`}</h3>
                </div>
                <ScrollPanel style={{ width: '100%', height: '120px', backgroundColor: "silver", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} className="custombar1">
                    <p>{props.desc}</p>
                </ScrollPanel>
            </div>


            <div style={{ marginTop: "5%", textAlign: "left" }}>
                <ToggleButton style={{ borderRadius: "50px", border: "0px", backgroundColor: checked ? "#EB3D3D" : "" }} onLabel="" offLabel="" onIcon="pi pi-heart-fill" offIcon="pi pi-heart"
                    checked={checked} onChange={(e) => setChecked(e.value)} />
            </div>


        </Card>
    </div>

}
