import './App.css'
import { createContext, useState } from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { TabMenu } from 'primereact/tabmenu';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import RegistrationComponent from './app/components/pages/signup';
// import NotFound from './app/components/pages/not-found';
import LoginComponent from './app/components/pages/login';
import UserVacationsPage from './app/components/pages/usersVacations';
import AdminVacationsPage from './app/components/pages/adminVacations';
import AddVacation from './app/components/pages/adminVacations/addVacation';
import { Button } from 'primereact/button';
import { ProtectedRoute } from './app/components/ui-components/protected-route';
import { Image } from 'primereact/image';
import logoImage from '../src/assets/logo1.png';


console.log("test")
interface IRoute {
  path: string,
  key: string,
  component: any,
  label?: string,
  icon?: string
  onlyAdmin?: boolean
}
const routes: Array<IRoute> = [

  // {
  //     path: "/countries",
  //     component: <ProtectedRoute><CountriesPage /></ProtectedRoute>,
  //     key: "countries",
  //     label: "Countries"
  // },
  {
    path: "/signup",

    component: <RegistrationComponent />,
    key: "signup",
    label: "Sign-up",
    icon: "pi pi-sign-in",
    onlyAdmin: true
  },
  {
    path: "/login",
    component: <LoginComponent />,
    key: "login",
    label: "Log-In",
    icon: "pi pi-user",
    onlyAdmin: true
  },
  {

    path: "/user-vacations",
    component: <ProtectedRoute><UserVacationsPage /></ProtectedRoute>,
    key: "user-vacations",
    label: "Vacations",
    icon: "pi pi-globe",
    onlyAdmin: false
  },
  {
    path: "/admin-vacations",
    component: <ProtectedRoute><AdminVacationsPage /></ProtectedRoute>,
    key: "admin-vacations",
    label: "Admin Vacations",
    icon: "pi pi-globe",
    onlyAdmin: true
  },
  {

    path: "/add-vacation",
    component: <ProtectedRoute><AddVacation /></ProtectedRoute>,
    key: "add-vacation",
    // label: "Add Vacations",
    // icon: "pi pi-user"
  },
  // {
  //   path: "*",
  //   component: <NotFound />,
  //   key: "not found",
  // }

]

// function OnlyAdmin(props: any) {
//   const { Component } = props
//   if (localStorage.getItem("role") === "admin") {
//     return <Component />
//   } else {
//     return <></>
//   }
// }



function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const onTabChange = (e: any) => {
    const selectedIndex = e.index;
    const route = routes[selectedIndex];
    navigate(route.path);
    setActiveIndex(e.index)
  };

  function logoutHandler() {
    navigate("/login")
    localStorage.setItem("token", "")
    localStorage.setItem("role", "")
  }

  return (
    <div>
      <div className='top-container'>
        <Button style={{ display: "flex", justifyContent: "left" }} onClick={logoutHandler} severity="info" raised icon="pi pi-sign-out" label="Log Out" />
        <div className='tabMenu' >
          <div style={{ marginBottom: "3%" }}>
            <Image src={logoImage} alt="Image" width="250" />
          </div>
          <TabMenu model={routes.filter(route => route.label).map(route => ({ label: route.label, value: route.key, icon: route.icon }))} activeIndex={activeIndex} onTabChange={onTabChange} />
        </div>
      </div>

      <div style={{ marginTop: "5%", display: "flex", justifyContent: "center" }}>
        {/* {routes.filter(r => r.label).map((route: IRoute) => {
          return <Link key={route.label} to={route.path} > {route.label} </Link>
        })} */}
        <Routes>
          {routes.map((route: IRoute) => {
            return <Route path={route.path} key={route.key} element={route.component} />
          })}
        </Routes>
      </div>
    </div>

  )
}

// function showRoutesPerRole(route: IRoute) {

//   // check only users that have admin OR regular users.

//   if (localStorage.getItem("role") !== "admin") return true
//   return route.onlyAdmin && localStorage.getItem("role") === "admin"
// }



export default App

