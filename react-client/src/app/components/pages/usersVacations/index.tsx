
import { useCallback, useEffect, useState } from "react"
import { IVacations } from "./api"
import { useNavigate } from "react-router-dom";
import VacationList from "./vacationsList";
import { useAppDispatch } from "../../../hooks";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { fetchVacationsAsync } from "../adminVacations/vacationSlice";
import { WithLoading } from "../../ui-components/withLoading";
import { IFollowerByUser, getFollowersByUserIdService } from "../followers/api/followers";
import { Divider } from "primereact/divider";
import { Fieldset } from 'primereact/fieldset';
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";


export default function UserVacationsPage() {
    const [futureChecked, setfutureChecked] = useState<boolean>(false);
    const [isVacationsLoading, setIsVacationsLoading] = useState<boolean>(false);
    const [followingChecked, setFollowingChecked] = useState<boolean>(false);
    const [onGoingVacationCecked, setOnGoingVacationCecked] = useState<boolean>(false);
    const [filteredVacations, setFilteredVacations] = useState<IVacations[]>([]);
    const [followers, setFollowers] = useState<IFollowerByUser[]>([])

    const handlerFutureChecked = useCallback((e: ToggleButtonChangeEvent) => {
        setfutureChecked(e.value)
        if (e.value) {
            setOnGoingVacationCecked(false);
        }
    }, [futureChecked])

    const handlerFollowingChecked = useCallback((e: ToggleButtonChangeEvent) => {
        setFollowingChecked(e.value)
        fetchFollowingVacations()
    }, [followingChecked])

    const handlerOngoingChecked = useCallback((e: ToggleButtonChangeEvent) => {
        setOnGoingVacationCecked(e.value);
        if (e.value) {
            setfutureChecked(false);
        }
    }, []);

    const currentDate = new Date()

    const dispatch = useAppDispatch();
    const vacations = useSelector((state: RootState) => state.vacations.vacationsData);
    const navigate = useNavigate()


    async function fetchFollowingVacations() {
        try {
            const followersData = await getFollowersByUserIdService();
            setFollowers(followersData);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    }


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
    }, [dispatch]);

    useEffect(() => {
        fetchFollowingVacations();
    }, []);


    useEffect(() => {
        const filteredFutureVacations = futureChecked
            ? vacations.filter(vacation => new Date(vacation.startDate) > currentDate)
            : vacations;

        const filteredOngoingVacations = onGoingVacationCecked
            ? vacations.filter(
                vacation =>
                    new Date(vacation.startDate) <= currentDate &&
                    new Date(vacation.endDate) >= currentDate
            )
            : filteredFutureVacations;

        if (followingChecked) {
            const followedVacationIds = followers.map(f => f.vacationId);
            const filteredFollowedVacations = filteredOngoingVacations.filter(
                vacation => followedVacationIds.includes(vacation.vacationId)
            );
            setFilteredVacations(filteredFollowedVacations);
        } else {
            setFilteredVacations(filteredOngoingVacations);
        }
    }, [vacations, futureChecked, onGoingVacationCecked, followingChecked, followers,]);




    return <div className="mainVacationUser">
        <WithLoading isLoading={isVacationsLoading}>
            <div className="filters ">
                <Fieldset className="fieldset" style={{ width: "100%", color: "#113446", fontSize: "larger" }} collapseIcon="pi pi-filter-slash" expandIcon="pi pi-filter-fill" legend="Filters" toggleable >
                    <span style={{ width: "100%" }}>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            <div style={{ margin: "auto" }} className="checkbox">
                                <ToggleButton onLabel="Future Vacations" offLabel="Future Vacations" onIcon="pi pi-check-circle" offIcon="pi pi-circle" onChange={handlerFutureChecked} checked={futureChecked} style={{ width: "12rem", backgroundColor: futureChecked ? "#FFC436" : "" }} />
                            </div>
                            <div style={{ margin: "auto" }} className="checkbox">
                                <ToggleButton onLabel="Liked Vacations" offLabel="Liked Vacations" onIcon="pi pi-check-circle" offIcon="pi pi-circle" onChange={handlerFollowingChecked} checked={followingChecked} style={{ width: "12rem", backgroundColor: followingChecked ? "#FFC436" : "" }} />
                            </div>
                            <div style={{ margin: "auto" }} className="checkbox">
                                <ToggleButton onLabel="On Going" offLabel="On Going" onIcon="pi pi-check-circle" offIcon="pi pi-circle" onChange={handlerOngoingChecked} checked={onGoingVacationCecked} style={{ width: "12rem", backgroundColor: onGoingVacationCecked ? "#FFC436" : "" }} />
                            </div>
                        </div>

                    </span>

                </Fieldset>




            </div>

            <div className="vacations">
                <VacationList vacations={filteredVacations} />
            </div>

        </WithLoading >
    </div >
}


