
import { useCallback, useEffect, useState } from "react"
import { IVacations } from "./api"
import { useNavigate } from "react-router-dom";
import VacationList from "./vacationsList";
import { useAppDispatch } from "../../../hooks";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { fetchVacationsAsync } from "../adminVacations/vacationSlice";
import { Checkbox } from 'primereact/checkbox';
import { WithLoading } from "../../ui-components/withLoading";
import { IFollowerByUser, getFollowersByUserIdService } from "../followers/api/followers";


export default function UserVacationsPage() {
    const [futureChecked, setfutureChecked] = useState<boolean>(false);
    const [isVacationsLoading, setIsVacationsLoading] = useState<boolean>(false);
    const [followingChecked, setFollowingChecked] = useState<boolean>(false);
    const [onGoingVacationCecked, setOnGoingVacationCecked] = useState<boolean>(false);
    const [filteredVacations, setFilteredVacations] = useState<IVacations[]>([]);
    const [followers, setFollowers] = useState<IFollowerByUser[]>([])

    const handlerFutureChecked = useCallback((e: any) => {
        setfutureChecked(e.checked)
        if (e.checked) {
            setOnGoingVacationCecked(false);
        }
    }, [futureChecked])

    const handlerFollowingChecked = useCallback((e: any) => {
        setFollowingChecked(e.checked)
    }, [followingChecked])

    const handlerOngoingChecked = useCallback((e: any) => {
        setOnGoingVacationCecked(e.checked);
        if (e.checked) {
            setfutureChecked(false);
        }
    }, []);

    const currentDate = new Date()

    const dispatch = useAppDispatch();
    const vacations = useSelector((state: RootState) => state.vacations.vacationsData);
    const navigate = useNavigate()


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
        async function fetchFollowers() {
            try {
                const followersData = await getFollowersByUserIdService();
                setFollowers(followersData);
            } catch (error) {
                console.error("Error fetching followers:", error);
            }
        }

        fetchFollowers();
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
    }, [vacations, futureChecked, onGoingVacationCecked, followingChecked, followers]);




    return <div>
        <WithLoading isLoading={isVacationsLoading}>
            <div style={{ padding: "2%", backgroundColor: "#C0C0C0", color: "#495057", display: "flex", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} className="vacations ">
                <div style={{ margin: "auto", paddingRight: "2%" }}>
                    <Checkbox onChange={handlerFutureChecked} checked={futureChecked}></Checkbox>
                    <label htmlFor="ingredient1" className="ml-2">Show only future vacations</label>
                </div>
                <div style={{ margin: "auto", paddingRight: "2%" }}>
                    <Checkbox onChange={handlerFollowingChecked} checked={followingChecked}></Checkbox>
                    <label htmlFor="ingredient1" className="ml-2">Show only my following vacations</label>
                </div>
                <div style={{ margin: "auto", paddingRight: "2%" }}>
                    <Checkbox onChange={handlerOngoingChecked} checked={onGoingVacationCecked}></Checkbox>
                    <label htmlFor="ingredient1" className="ml-2">On going vacations</label>
                </div>
            </div>
            <div style={{ backgroundColor: "#EFF3F8" }}>
                <VacationList vacations={filteredVacations} />
            </div>
        </WithLoading>
    </div >
}


