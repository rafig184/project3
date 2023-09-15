
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const ContactForm = () => {
    const [formStatus, setFormStatus] = React.useState('pi pi-send')
    const navigate = useNavigate();

    const onSubmit = (e: any) => {
        e.preventDefault()
        setFormStatus('pi pi-check')

        const { name, email, message } = e.target.elements



        let conFom = {
            name: name.value,
            email: email.value,
            message: message.value,
        }

        console.log(conFom)


        setTimeout(() => {
            name.value = ''
            email.value = ''
            message.value = ''
            setFormStatus('pi pi-send')
        }, 2000);
    }

    function homeNavigate() {
        navigate("/user-vacations")
    }

    return (
        <div style={{ marginBottom: "30%" }}>
            <div style={{ color: "white", display: "flex", flexDirection: "column", borderRadius: "10px", backgroundColor: "#0F3244", padding: "4%", marginBottom: "15%" }}>
                <h2 >Contact Us</h2>
                <form onSubmit={onSubmit}>
                    <div style={{ color: "white", display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label className="form-label" htmlFor="name" >
                            Name :
                        </label>
                        <InputText className="form-control" type="text" id="name" required />
                    </div >
                    <div className="mb-3" style={{ color: "white", display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label className="form-label" htmlFor="email" style={{ marginTop: "5px" }}>
                            Email :
                        </label>
                        <InputText className="form-control" type="email" id="email" required />
                    </div>
                    <div className="mb-3" style={{ color: "white", display: "flex", flexDirection: "column" }}>
                        <label className="form-label" htmlFor="message">
                            Message :
                        </label>
                        <InputTextarea className="form-control" id="message" rows={5} cols={30} required />
                    </div>
                    <a ></a>
                    <Button icon={formStatus} severity="warning" rounded type='submit' /><br></br>
                    <label className="form-label" htmlFor="message">
                        Send
                    </label>
                </form>
            </div>
            <div >
                <Button icon="pi pi-home" label="Home Page" severity="info" text raised onClick={homeNavigate} />
            </div>
        </div>

    )
}
export default ContactForm