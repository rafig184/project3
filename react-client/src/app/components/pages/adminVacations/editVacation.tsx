import axios from "axios";
import { InputText } from "primereact/inputtext";
import { useState, useCallback, useRef, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { getVacationsByIdService } from "./api";



const EditVacationPage = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate()
    const toast = useRef<Toast>(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const vacId = queryParams.get('vid');
    console.log(vacId);



    const handlerDestinationCallback = useCallback((e: any) => {
        setDestination(e.target.value)
    }, [destination])

    const handlersStartDateCallback = useCallback((e: any) => {
        setStartDate(e.target.value)
    }, [startDate])

    const handlerEndDateCallback = useCallback((e: any) => {
        setEndDate(e.target.value)
    }, [endDate])

    const handlerPriceCallback = useCallback((e: any) => {
        setPrice(e.target.value)
    }, [price])

    const handlerDescriptionCallback = useCallback((e: any) => {
        setDescription(e.target.value)
    }, [description])

    const handlerImageCallback = useCallback((e: any) => {
        setImage(e.target.value)
    }, [image])

    const show = () => {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Vacation Edited', life: 3000 });
    }
    const destinationError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "You forgot to pick a destination!", life: 3000 });
    }
    const starDateError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "You forgot to pick a start date!", life: 3000 });
    }
    const endDateError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "You forgot to pick a end date!", life: 3000 });
    }
    const priceError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "You forgot to pick a price!", life: 3000 });
    }
    const amountPriceError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "The price cannot be more than 10000$", life: 3000 });
    }
    const descriptionError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "You forgot to add a description!", life: 3000 });
    }
    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "Something went wrong!", life: 3000 });
    }

    async function getVacationByIdAction(vacationId: any) {
        try {
            const result = await getVacationsByIdService(vacationId)
            setDestination(result[0].destination)
            setStartDate(new Date(result[0].startDate))
            setEndDate(new Date(result[0].endDate))
            setPrice(result[0].price)
            setDescription(result[0].description)
            setImage(result[0].image)
            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getVacationByIdAction(vacId)
    }, []);


    async function editVacationService() {
        if (destination === "") return destinationError()
        if (startDate === null) return starDateError()
        if (endDate === null) return endDateError()
        if (price === null) return priceError()
        if (price > 10000) return amountPriceError()
        if (description === "") return descriptionError()

        const vacationPayload = {
            destination,
            startDate,
            endDate,
            price,
            description,
            image
        }

        console.log(vacationPayload);
        try {
            const result = await axios.put(`http://localhost:4000/vacations/edit-vacation?q=${vacId}`, vacationPayload, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            console.log(result);

            show()
            setTimeout(() => {
                navigate("/admin-vacations")
            }, 1000);

        } catch (err) {
            showError()
            console.log(err);
        }
    }


    return (

        <div style={{ backgroundColor: "grey", padding: "4%", borderRadius: "10px" }}>

            <form >
                <h2>Edit vacation</h2>
                <div>
                    <div>
                        <label htmlFor="text">Destination:</label>
                    </div>
                    <InputText
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={handlerDestinationCallback}
                        required
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="text">Start Date:</label>
                    </div>
                    <Calendar value={startDate} onChange={handlersStartDateCallback} dateFormat="dd/mm/yy" required />
                </div>
                <div>
                    <div>
                        <label htmlFor="text">End date:</label>
                    </div>
                    <Calendar value={endDate} minDate={new Date(startDate)} onChange={handlerEndDateCallback} dateFormat="dd/mm/yy" required />
                </div>
                <div>
                    <div>
                        <label htmlFor="text">Price:</label>
                    </div>
                    <InputNumber
                        id="price"
                        value={price}
                        onValueChange={handlerPriceCallback}
                        required
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="text">Description:</label>
                    </div>
                    <InputTextarea value={description} onChange={handlerDescriptionCallback} rows={5} cols={30} required />
                </div>
                <div>
                    <div>
                        <label htmlFor="text">Image:</label>
                    </div>
                    <InputText
                        type="text"
                        id="image"
                        value={image}
                        onChange={handlerImageCallback}

                    />
                </div>
                <Toast ref={toast} />
                <button className="buttons" style={{ marginTop: "5%" }} type="button" onClick={editVacationService} >Edit Vacation</button>
            </form>
        </div>

    )

}


export default EditVacationPage
