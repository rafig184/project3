
import { IVacations } from "../api";
import { ScrollPanel } from "primereact/scrollpanel";
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { useEffect, useState } from "react";
import { Image } from "primereact/image";
import { format } from "date-fns";
import { addFollowService, deleteFollowerService, getFollowersByUserIdService } from "../../followers/api/followers";
import { useAppDispatch } from "../../../../hooks";
import { fetchFollowersAmountAsync } from "../../followers/followersSlice";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import { WithLoading } from "../../../ui-components/withLoading";




export function VacationCard(props: IVacations) {
    const [checked, setChecked] = useState<boolean>(false);
    const [isVacationsLoading, setIsVacationsLoading] = useState<boolean>(false);
    const [amountOfFollower, setAmountOfFollower] = useState<number | undefined>(0);
    const dispatch = useAppDispatch();
    const followers = useSelector((state: RootState) => state.followers.followerCount);



    useEffect(() => {
        try {
            dispatch(fetchFollowersAmountAsync());
        } catch (error) {
            alert("error")
        }
    }, [dispatch, amountOfFollower]);


    const handleToggle = async (e: ToggleButtonChangeEvent) => {
        setChecked(e.value);
        if (e.value) {
            await addFollowService(props.vacationId);
            setAmountOfFollower((prevAmount) => (prevAmount || 0) + 1);
        } else {
            await deleteFollowerService(props.vacationId)
            setAmountOfFollower((prevAmount) => (prevAmount || 0) - 1);

        }
    };


    const amountOfFollowers = followers.find(f => f.vacationId === props.vacationId)?.amountOfFollowers


    useEffect(() => {
        async function getFollowByUser() {
            try {
                setIsVacationsLoading(true)
                const result = await getFollowersByUserIdService()
                if (result.find(f => f.vacationId === props.vacationId)) setChecked(true)
            } catch (error) {
                console.log(error);
            } finally {
                setIsVacationsLoading(false)
            }
        }
        getFollowByUser()
    }, [])



    const formatedStartDate = format(new Date(props.startDate), "dd/MM/yyyy")
    const formatedEndtDate = format(new Date(props.endDate), "dd/MM/yyyy")


    return <div style={{ margin: "2%" }} className="vacations">
        <WithLoading isLoading={isVacationsLoading}>

            <div className="vacationCard" >
                <div style={{ position: "relative" }}>
                    <Image src={props.image} alt="Destination" style={{
                        height: "200px", width: "350px", borderTopLeftRadius: 10, borderTopRightRadius: 10,
                        overflow: "hidden",
                        borderWidth: 3,
                        borderColor: "red"
                    }} width="350" height="200" preview />
                    <h2 className="destination" >{props.destination.toUpperCase()}</h2>
                </div>
                <div style={{ marginTop: "-4%" }}>
                    <div style={{ borderBottomRightRadius: "10px" }}>
                        <div className="cardDate">
                            <span style={{ color: "white" }} >
                                <i className={"pi pi-calendar"}></i><span> </span>
                                {formatedStartDate} - {formatedEndtDate}</span>
                        </div>
                        <ScrollPanel className="scroller">
                            <p>{props.description}</p>
                        </ScrollPanel>

                    </div>
                    <div className="vacationPrice" >
                        <ToggleButton style={{ borderRadius: "50px", border: "0px", backgroundColor: checked ? "#EB3D3D" : "" }} onLabel="" offLabel="" onIcon="pi pi-heart-fill" offIcon="pi pi-heart"
                            checked={checked} onChange={handleToggle} className="heartBtn" />
                        <h3 style={{ color: "black", fontSize: "xx-large", fontWeight: "600" }}>{`${props.price} $`}</h3>
                    </div>
                    <span className="followerDiv">

                        {amountOfFollowers !== undefined ? (
                            <span style={{ color: "#495057" }}>{`${amountOfFollowers} Liked this post`}</span>
                        ) : (
                            <span>0 Liked this post</span>
                        )}
                    </span>
                </div>
            </div>
        </WithLoading>
    </div >
}
