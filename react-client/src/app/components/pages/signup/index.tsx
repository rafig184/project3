import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from "primereact/button";
import { Splitter, SplitterPanel } from 'primereact/splitter';

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

    function isValidEmail(email: string) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }


    async function signUpService() {
        if (methods.getValues("password").length < 4) return passwordError()
        if (!isValidEmail(methods.getValues("email"))) {
            return emailError();
        }


        const signUpPayload = {
            email: methods.getValues("email"),
            firstName: methods.getValues("firstName"),
            password: methods.getValues("password"),
            lastName: methods.getValues("lastName"),
        }

        try {
            const result = await axios.post("http://localhost:4000/auth/sign-up", signUpPayload)
            if (result.data.errorCode === 1062) {
                emailExistError(result.data.message)
                return
            }
            console.log(result.data.message)
            showSuccess(result.data.message)
            setTimeout(() => { navigate("/login") }, 1000)
        } catch (err) {
            console.log(err);
            showError()
        }

    }

    const showSuccess = (message: any) => {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });

    }
    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "Something went wrong", life: 3000 });
    }

    const emailError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "Your email is not valid", life: 3000 });
    }

    const emailExistError = (message: string) => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    }

    const passwordError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "Your password is less than 4 characters", life: 3000 });
    }

    const header = <div className="font-bold mb-3">Pick a password</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Requierments :</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Minimum 4 characters</li>
            </ul>
        </>
    );


    return (
        <FormProvider {...methods}>
            <div className="mainSignin" >
                <div >
                    <img className="formImgSignin" src="./src/assets/sign.png" ></img>
                </div>

                <div className="formSignIn" >
                    <h2 style={{ fontWeight: "400", color: "#F59E0B" }}>Sign up</h2>
                    <form >
                        <div style={{ display: "flex", flexDirection: "column", textAlign: "left", gap: "7px" }}>
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
                            <Password
                                value={methods.getValues("password")}
                                onChange={(e) => methods.setValue("password", e.target.value)}
                                toggleMask header={header} footer={footer}
                            />
                            {methods.formState.errors.password && <span>{methods.formState.errors.password.message}</span>}
                        </div>
                        <Toast ref={toast} />
                        <Button icon="pi pi-sign-in" style={{ marginTop: "7%" }} type="button" rounded severity="warning" aria-label="Notification" onClick={signUpService} />
                        <div>Sign up</div>
                        {/* <button className="buttons" style={{ marginTop: "5%" }} type="button" onClick={signUpService} >Sign Up</button> */}
                        <div style={{ marginTop: "3%" }}>
                            <span>Already a user? </span>
                        </div>
                        <Link className="links" to="/login"> Log in!</Link>
                    </form>
                </div>
            </div >



        </FormProvider >
    );
};

export default RegistrationComponent;