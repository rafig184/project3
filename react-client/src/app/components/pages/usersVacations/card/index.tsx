import { Button } from "primereact/button";
import { IVacations } from "../api";
import { Card } from 'primereact/card';
import { ScrollPanel } from "primereact/scrollpanel";
import { ToggleButton } from 'primereact/togglebutton';
import { useState } from "react";
import { Image } from "primereact/image";

export function VacationCard(props: IVacations) {
    const [checked, setChecked] = useState(false);

    const header = (
        <Image style={{ height: "200px", width: "350px" }} src={props.image} alt="card" width="350" height="200" preview />
    );
    const footer = (
        <div className="flex flex-wrap justify-content-left gap-2">
            <Button label="" icon="pi pi-heart" severity="danger" />

        </div>
    );

    return <div style={{ margin: "2%" }}>
        <Card title={props.destination.toUpperCase()} header={header} style={{ width: "350px", height: "600px" }}>
            <div style={{ backgroundColor: "grey", borderRadius: "10px" }}>
                <div style={{ backgroundColor: "#495057", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                    <span style={{ color: "white" }}>{props.startDate} - {props.endDate}</span>
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
