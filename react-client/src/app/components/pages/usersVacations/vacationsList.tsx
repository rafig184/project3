
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"
import { IVacations } from "./api"
import { VacationCard } from "./card"
import { useState } from "react";


export default function VacationList(props: { vacations: Array<IVacations> }) {

    const [first, setFirst] = useState<number>(0);



    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
    };



    const displayedVacations = props.vacations.slice(first, first + 9);

    return <div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>
            {
                displayedVacations.map((vacation: { vacationId: number, image: string, destination: string, startDate: string, endDate: string, price: number, description: string }) => {
                    return <VacationCard key={vacation?.destination + vacation.startDate}
                        vacationId={vacation.vacationId}
                        image={vacation.image}
                        destination={vacation?.destination}
                        description={vacation?.description}
                        startDate={vacation.startDate}
                        endDate={vacation.endDate}
                        price={vacation.price} />
                })}

        </div>
        <Paginator style={{ backgroundColor: "#EFF3F8" }} first={first} rows={9} totalRecords={props.vacations.length} onPageChange={onPageChange} />
    </div>
}