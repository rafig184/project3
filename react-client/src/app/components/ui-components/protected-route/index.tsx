import { Navigate } from "react-router-dom"


export function ProtectedRoute(props: { children: any }) {
    const token = localStorage.getItem("token")
    if (token) return props.children
    else return <Navigate to="/login" />
}