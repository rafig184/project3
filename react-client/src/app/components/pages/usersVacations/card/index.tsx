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


    return <div style={{ margin: "2%", backgroundColor: "#EFF3F8" }}>
        <Card header={header} style={{ width: "350px", height: "560px" }}>
            <div style={{ borderBottomRightRadius: "10px" }}>
                <div style={{ position: "relative", marginBottom: "1%", backgroundColor: "#495057", paddingTop: "2%", paddingBottom: "2%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", zIndex: 1 }}>
                    <span style={{ color: "white" }}>
                        <i className={"pi pi-calendar"}></i><span> </span>
                        {formatedStartDate} - {formatedEndtDate}</span>
                </div>
                <ScrollPanel style={{ position: "relative", marginTop: "-8px", width: '101%', height: '130px', backgroundColor: "silver", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", zIndex: 2 }} className="custombar1">
                    <p>{props.desc}</p>
                </ScrollPanel>

            </div>
            <div style={{ borderRadius: "10px", padding: "1px", marginTop: "1%", backgroundColor: "#3B82F6" }} >
                <h3 style={{ color: "white" }}>{`${props.price} $`}</h3>
            </div>
            <div style={{ marginTop: "5%", textAlign: "left" }}>
                <ToggleButton style={{ borderRadius: "50px", border: "0px", backgroundColor: checked ? "#EB3D3D" : "" }} onLabel="" offLabel="" onIcon="pi pi-heart-fill" offIcon="pi pi-heart"
                    checked={checked} onChange={(e) => setChecked(e.value)} />
            </div>


        </Card>
    </div>

}
