import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";

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
            <div style={{ backgroundColor: "grey", padding: "20px", borderRadius: "10px" }}>
                <h2 style={{ fontWeight: "400" }}>Log In</h2>
                <form>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        Email:
                        <InputText type="email" {...methods.register("email")} />
                        {methods.formState.errors.email && <span>{methods.formState.errors.email.message}</span>}
                        Password:
                        <Password
                            value={methods.getValues("password")}
                            onChange={(e) => methods.setValue("password", e.target.value)}
                            toggleMask feedback={false}
                        />
                        {methods.formState.errors.password && <span>{methods.formState.errors.password.message}</span>}
                    </div>
                    <Toast ref={toast} />
                    <button className="buttons" style={{ marginTop: "7%" }} type="button" onClick={logInService} >Log In</button>
                    <div style={{ marginTop: "3%" }}>
                        <span>Dont have an account? </span>
                    </div>
                    <Link className="links" to="/signup"> Sign Up!</Link>
                </form>
            </div>
        </FormProvider>
    );
};

export default LoginComponent;