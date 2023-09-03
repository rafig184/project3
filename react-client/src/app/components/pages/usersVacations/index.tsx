
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
        fetchFollowers()
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


    async function fetchFollowers() {
        try {
            setIsVacationsLoading(true)
            const followersData = await getFollowersByUserIdService();
            setFollowers(followersData);
        } catch (error) {
            console.error("Error fetching followers:", error);
        } finally {
            setIsVacationsLoading(false)
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
    }, [vacations, futureChecked, onGoingVacationCecked, followingChecked, followers,]);




    return <div className="mainVacationUser">
        <WithLoading isLoading={isVacationsLoading}>
            <div className="filters ">
                <div style={{ margin: "auto", paddingRight: "2%" }} className="checkbox">
                    <Checkbox onChange={handlerFutureChecked} checked={futureChecked}></Checkbox>
                    <label htmlFor="ingredient1" className="ml-2">Future Vacations</label>
                </div>
                <div style={{ margin: "auto", paddingRight: "2%" }} className="checkbox">
                    <Checkbox onChange={handlerFollowingChecked} checked={followingChecked}></Checkbox>
                    <label htmlFor="ingredient1" className="ml-2">Following Vacations</label>
                </div>
                <div style={{ margin: "auto", paddingRight: "2%" }} className="checkbox">
                    <Checkbox onChange={handlerOngoingChecked} checked={onGoingVacationCecked}></Checkbox>
                    <label htmlFor="ingredient1" className="ml-2">On Going Vacations</label>
                </div>
            </div>
            <div className="vacations">
                <VacationList vacations={filteredVacations} />
            </div>
        </WithLoading>
    </div >
}


