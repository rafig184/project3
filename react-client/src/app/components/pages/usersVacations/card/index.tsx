
import { IVacations } from "../api";
import { Card } from 'primereact/card';
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
                // console.log(result);

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

            <div style={{ backgroundColor: "#FFFFFF", height: "550px", borderRadius: "10px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" }}>
                <div style={{ position: "relative" }}>
                    <Image src={props.image} alt="Destination" style={{ height: "200px", width: "350px" }} width="350" height="200" preview />
                    <h2 style={{ position: "absolute", top: "10px", left: "10px", color: "white", zIndex: 1, textShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)" }}>{props.destination.toUpperCase()}</h2>
                </div>
                <div style={{ marginTop: "-4%" }}>
                    <div style={{ borderBottomRightRadius: "10px" }}>
                        <div style={{ position: "relative", marginBottom: "1%", backgroundColor: "#B4E3FF", paddingTop: "2%", paddingBottom: "2%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", zIndex: 1 }}>
                            <span style={{ color: "#495057" }} >
                                <i className={"pi pi-calendar"}></i><span> </span>
                                {formatedStartDate} - {formatedEndtDate}</span>
                        </div>
                        <ScrollPanel style={{ paddingLeft: "5%", textAlign: "left", color: "#495057", position: "relative", marginTop: "-8px", width: '350px', height: '160px', backgroundColor: "#FFFFFF", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", zIndex: 2 }}>
                            <p>{props.description}</p>
                        </ScrollPanel>

                    </div>
                    <div style={{ borderRadius: "10px", padding: "1px", marginTop: "1%", backgroundColor: "#3B82F6", marginRight: "3%", marginLeft: "3%" }} >
                        <h3 style={{ color: "white" }}>{`${props.price} $`}</h3>
                    </div>
                    <div style={{
                        paddingLeft: "7%", paddingRight: "5%", marginTop: "7%", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                        <ToggleButton style={{ borderRadius: "50px", border: "0px", backgroundColor: checked ? "#EB3D3D" : "" }} onLabel="" offLabel="" onIcon="pi pi-heart-fill" offIcon="pi pi-heart"
                            checked={checked} onChange={handleToggle} />
                        {amountOfFollowers !== undefined ? (
                            <span style={{ color: "#495057" }}>{`${amountOfFollowers} Liked this post`}</span>
                        ) : (
                            <span>0 Liked this post</span>
                        )}
                    </div>
                </div>
            </div>
        </WithLoading>
    </div >

}
