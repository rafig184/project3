
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"
import { AdminVacationCard, IVacationsAdmin } from "./card"
import { useState } from "react";


export default function AdminVacationList(props: { vacations: Array<IVacationsAdmin> }) {

    const [first, setFirst] = useState<number>(0);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
    };
    const displayedVacations = props.vacations.slice(first, first + 9);


    return <div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>
            {displayedVacations.map((vacation: { image: string, destination: string, startDate: Date, endDate: Date, price: number, desc: string, vacationId: number }) => {
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
        <Paginator style={{ backgroundColor: "#EFF3F8" }} first={first} rows={9} totalRecords={props.vacations.length} onPageChange={onPageChange} />
    </div>
}