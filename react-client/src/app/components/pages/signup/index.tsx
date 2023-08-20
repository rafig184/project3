import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import { useRef } from "react";


const registrationSchema = object({
    email: string().email("Invalid email"),
    firstName: string(),
    password: string().min(4, "Password must be more than 4 characters"),
    lastName: string(),
});

type RegistrationInput = TypeOf<typeof registrationSchema>;

const RegistrationComponent = () => {
    const navigate = useNavigate()
    const toast = useRef<Toast>(null);
    const methods = useForm<RegistrationInput>({
        resolver: zodResolver(registrationSchema),
    });


    async function signUpService() {
        const signUpPayload = {
            email: methods.getValues("email"),
            firstName: methods.getValues("firstName"),
            password: methods.getValues("password"),
            lastName: methods.getValues("lastName"),
        }

        try {
            const result = await axios.post("http://localhost:4000/auth/sign-up", signUpPayload)
            showSuccess(result.data.message)
            // alert(result.data.message)
            setTimeout(() => { navigate("/login") }, 1000)
        } catch (ex) {
            console.log(ex);
            showError()
            // alert("Something went wrong!")
        }

    }

    const showSuccess = (result: any) => {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: result, life: 3000 });

    }
    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "Something went wrong!", life: 3000 });
    }


    return (
        <FormProvider {...methods}>
            <div style={{ backgroundColor: " grey", padding: "20px", borderRadius: "10px" }}>
                <h2>Sign up</h2>
                <form >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        Email:
                        <InputText type="email" {...methods.register("email")} />
                        {methods.formState.errors.email && <span>{methods.formState.errors.email.message}</span>}
                        First name:
                        <InputText type="text" {...methods.register("firstName")} />
                        {methods.formState.errors.firstName && <span>{methods.formState.errors.firstName.message}</span>}
                        Last name:
                        <InputText type="text" {...methods.register("lastName")} />
                        {methods.formState.errors.lastName && <span>{methods.formState.errors.lastName.message}</span>}
                        Password:
                        <InputText type="password" {...methods.register("password")} />
                        {methods.formState.errors.password && <span>{methods.formState.errors.password.message}</span>}
                    </div>
                    <Toast ref={toast} />
                    <Button style={{ marginTop: "5%" }} raised type="button" onClick={signUpService} severity="info">Sign Up</Button>
                    <div style={{ marginTop: "3%" }}>
                        <span>Already a user? <Link style={{ cursor: "pointer", color: "darkblue" }} to="/login"> Log in!</Link></span>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default RegistrationComponent;