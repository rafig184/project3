import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { urlApi } from "../../../../App";

const loginSchema = object({
    email: string().email("Invalid email"),
    password: string(),

});

type LoginInput = TypeOf<typeof loginSchema>;

const LoginComponent = () => {
    window.scrollTo(0, 0);
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
            const result = await axios.post(`${urlApi}/auth/login`, loginPayload)
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
        }

    }

    const showSuccess = (result: any) => {
        toast.current?.show({ severity: 'success', summary: 'Login Success', detail: result, life: 3000 });
    }
    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "Incorrect Email or password!", life: 3000 });
    }


    return (

        <FormProvider {...methods}>
            <div className="mainLogin">
                <div >
                    <img className="formImglogin" src="./src/assets/login.png" ></img>
                </div>
                <div className="formlogin" >
                    <h2 style={{ fontWeight: "500", color: "#F59E0B" }}>Log In</h2>
                    <form>
                        <div style={{ display: "flex", flexDirection: "column", gap: "7px", textAlign: "left" }}>
                            Email :
                            <InputText type="email" {...methods.register("email")} />
                            {methods.formState.errors.email && <span>{methods.formState.errors.email.message}</span>}
                            Password :
                            <Password
                                value={methods.getValues("password")}
                                onChange={(e) => methods.setValue("password", e.target.value)}
                                toggleMask feedback={false}
                            />
                            {methods.formState.errors.password && <span>{methods.formState.errors.password.message}</span>}
                        </div>
                        <Toast ref={toast} />
                        <Button icon="pi pi-sign-in" style={{ marginTop: "7%" }} type="button" rounded severity="warning" aria-label="Notification" onClick={logInService} />
                        <div>Log In</div>
                        <div style={{ marginTop: "3%" }}>
                            <span>Dont have an account? </span>
                        </div>
                        <Link className="links" to="/signup"> Sign Up!</Link>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
};

export default LoginComponent;