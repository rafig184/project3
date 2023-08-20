
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"
import { AdminVacationCard, IVacationsAdmin } from "./card"
import { useState } from "react";

export default function AdminVacationList(props: { vacations: Array<IVacationsAdmin> }) {

    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(10);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };



    return <div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>
            {props.vacations.map((vacation: { image: string, destination: string, startDate: string, endDate: string, price: number, desc: string, vacationId: number }) => {
                return <AdminVacationCard key={vacation?.destination + vacation.startDate}
                    image={vacation.image}
                    destination={vacation?.destination}
                    desc={vacation?.desc}
                    startDate={vacation.startDate}
                    endDate={vacation.endDate}
                    price={vacation.price}
                    vacationId={vacation.vacationId} />
            })}
        </div>
        <Paginator first={first} rows={10} totalRecords={props.vacations.length} onPageChange={onPageChange} />
    </div>
}