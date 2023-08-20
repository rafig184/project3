import axios from "axios";
import { InputText } from "primereact/inputtext";
import { useState, useCallback, useRef } from "react";
import { Calendar } from 'primereact/calendar';
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";


const AddVacation = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const toast = useRef<Toast>(null);



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

    const handlerDescCallback = useCallback((e: any) => {
        setDesc(e.target.value)
    }, [desc])

    const handlerImageCallback = useCallback((e: any) => {
        setImage(e.target.value)
    }, [image])

    const show = () => {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Vacation added', life: 3000 });

    }

    async function addVacationService() {
        const vacationPayload = {
            destination,
            startDate,
            endDate,
            price,
            desc,
            image
        }

        console.log(vacationPayload);
        try {
            const result = await axios.post("http://localhost:4000/vacations/new-vacation", vacationPayload)
            // added(result.data.message);
            show()
            setDestination("")
            setStartDate("")
            setEndDate("")
            setPrice(0)
            setDesc("")
            setImage("")

        } catch (err) {
            alert("Something went wrong!")
            console.log(err);
        }
    }

    return (
        <div style={{ backgroundColor: "grey", padding: "4%", borderRadius: "10px" }}>
            <form >
                <h2>Add new vacation</h2>
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
                    <Calendar value={startDate} onChange={handlersStartDateCallback} />

                </div>
                <div>
                    <div>
                        <label htmlFor="text">End date:</label>
                    </div>
                    <Calendar value={endDate} onChange={handlerEndDateCallback} />
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
                    <InputTextarea value={desc} onChange={handlerDescCallback} rows={5} cols={30} />
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
                        required
                    />
                </div>
                <Toast ref={toast} />
                <Button style={{ marginTop: "5%" }} type="button" onClick={addVacationService} raised>Add Vacation</Button>
            </form>
        </div>

    )

}


export default AddVacation