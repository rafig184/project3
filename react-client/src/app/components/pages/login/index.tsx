import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { useRef } from "react";
import { Toast } from "primereact/toast";

const loginSchema = object({
    email: string().email("Invalid email"),
    password: string(),

});

type LoginInput = TypeOf<typeof loginSchema>;

const LoginComponent = () => {
    const navigate = useNavigate()
    const toast = useRef<Toast>(null);
    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });


    async function logInService() {
        const loginPayload = {
            email: methods.getValues("email"),
            password: methods.getValues("password"),
        }

        try {
            const result = await axios.post("http://localhost:4000/auth/login", loginPayload)
            // alert("User logged in succesfully")
            showSuccess(result.data.message)
            console.log(result.data.firstName);
            localStorage.setItem("token", result.data.token)
            localStorage.setItem("role", result.data.role)
            localStorage.setItem("firstName", result.data.firstName)
            if (result.data.role === "user") {
                setTimeout(() => { navigate("/user-vacations") }, 500)
            } else setTimeout(() => { navigate("/admin-vacations") }, 500)

        } catch (ex) {
            console.log(ex);
            showError()
            // alert("Something went wrong!")
        }

    }

    const showSuccess = (result: any) => {
        toast.current?.show({ severity: 'success', summary: 'Login Success', detail: result, life: 3000 });
    }
    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "Something went wrong!", life: 3000 });
    }


    return (

        <FormProvider {...methods}>
            <div style={{ backgroundColor: " grey", padding: "20px", borderRadius: "10px" }}>
                <h2>Log In</h2>
                <form>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        Email:
                        <InputText type="email" {...methods.register("email")} />
                        {methods.formState.errors.email && <span>{methods.formState.errors.email.message}</span>}
                        Password:
                        <InputText type="password" {...methods.register("password")} />
                        {methods.formState.errors.password && <span>{methods.formState.errors.password.message}</span>}
                    </div>
                    <Toast ref={toast} />
                    <Button style={{ marginTop: "7%" }} type="button" raised onClick={logInService} severity="info">Log In</Button>
                    <div style={{ marginTop: "3%" }}>
                        <span>Not a user? <Link style={{ cursor: "pointer", color: "darkblue" }} to="/signup"> Sign Up!</Link></span>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default LoginComponent;