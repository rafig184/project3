import axios from "axios";
import { InputText } from "primereact/inputtext";
import { useState, useCallback, useRef } from "react";
import { Calendar } from 'primereact/calendar';
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { cleanup } from "@testing-library/react";



const AddVacation = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const toast = useRef<Toast>(null)



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
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Vacation added', life: 3000 });
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

    const clearState = () => {
        setDestination(""),
            setStartDate(""),
            setEndDate(""),
            setPrice(0),
            setDescription(""),
            setImage("")
    };

    async function addVacationService() {
        if (destination === "") return destinationError()
        if (startDate === "") return starDateError()
        if (endDate === "") return endDateError()
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
            const result = await axios.post("http://localhost:4000/vacations/new-vacation", vacationPayload, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            console.log((result));

            show()
            clearState()


        } catch (err) {
            showError()
            console.log(err);
        }
    }



    return (
        <div style={{ backgroundColor: "#0F3244", padding: "2%", borderRadius: "10px" }}>
            <form >
                <h2 style={{ fontWeight: "400" }}>Add New Vacation</h2>
                <div>
                    <div>
                        <label htmlFor="text">Destination :</label>
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
                        <label htmlFor="text">Start Date :</label>
                    </div>
                    <Calendar value={startDate} minDate={new Date()} onChange={handlersStartDateCallback} dateFormat="dd/mm/yy" required />
                </div>
                <div>
                    <div>
                        <label htmlFor="text">End date :</label>
                    </div>
                    <Calendar value={endDate} minDate={new Date(startDate)} onChange={handlerEndDateCallback} dateFormat="dd/mm/yy" required />
                </div>
                <div>
                    <div>
                        <label htmlFor="text">Price :</label>
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
                        <label htmlFor="text">Description :</label>
                    </div>
                    <InputTextarea value={description} onChange={handlerDescriptionCallback} rows={5} cols={30} required />
                </div>
                <div>
                    <div>
                        <label htmlFor="text">Image :</label>
                    </div>
                    <InputText
                        type="text"
                        id="image"
                        value={image}
                        onChange={handlerImageCallback}
                    />
                </div>
                <Toast ref={toast} />
                {/* <Button icon="pi pi-bell" rounded severity="warning" aria-label="Notification" /> */}
                <Button style={{ marginTop: "5%" }} rounded type="button" severity="warning" aria-label="Add Vacation" icon="pi pi-plus" onClick={addVacationService} />
                <div>Add Vacation</div>
            </form>
        </div>
    )
}


export default AddVacation