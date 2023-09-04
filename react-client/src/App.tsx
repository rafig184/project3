import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import { TabMenu } from 'primereact/tabmenu';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import RegistrationComponent from './app/components/pages/signup';
import LoginComponent from './app/components/pages/login';
import UserVacationsPage from './app/components/pages/usersVacations';
import AdminVacationsPage from './app/components/pages/adminVacations';
import AddVacation from './app/components/pages/adminVacations/addVacation';
import { Button } from 'primereact/button';
import { ProtectedRoute } from './app/components/ui-components/protected-route';
import logoImage from '../src/assets/logo1.png';
import { Avatar } from 'primereact/avatar';
import EditVacationPage from './app/components/pages/adminVacations/editVacation';
import ReportsPage from './app/components/pages/followers';
import NotFound from './app/components/pages/not-found';




interface IRoute {
  path: string,
  key: string,
  component: any,
  label?: string,
  icon?: string
  onlyAdmin: boolean
}
const routes: Array<IRoute> = [
  {
    path: "/admin-vacations",
    component: <ProtectedRoute><AdminVacationsPage /></ProtectedRoute>,
    key: "admin-vacations",
    label: "Admin Vacations",
    icon: "pi pi-globe",
    onlyAdmin: true
  },
  {
    path: "/reports",
    component: <ProtectedRoute><ReportsPage /></ProtectedRoute>,
    key: "reports",
    label: "Reports",
    icon: "pi pi-chart-bar",
    onlyAdmin: true

  },
  {
    path: "/user-vacations",
    component: <ProtectedRoute><UserVacationsPage /></ProtectedRoute>,
    key: "user-vacations",
    onlyAdmin: false
  },

  {
    path: "/add-vacation",
    component: <ProtectedRoute><AddVacation /></ProtectedRoute>,
    key: "add-vacation",
    onlyAdmin: true
  },
  {
    path: "/edit-vacation",
    component: <ProtectedRoute><EditVacationPage /></ProtectedRoute>,
    key: "edit-vacation",
    onlyAdmin: true
  },
  {
    path: "/signup",
    component: <RegistrationComponent />,
    key: "signup",
    onlyAdmin: false
  },
  {
    path: "/login",
    component: <LoginComponent />,
    key: "login",
    onlyAdmin: false
  },

  {
    path: "/",
    component: <LoginComponent />,
    key: "login",
    onlyAdmin: false
  },
  {
    path: "*",
    component: <NotFound />,
    key: "not found",
    onlyAdmin: false
  }

]



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
    localStorage.setItem("firstName", "")
    setActiveIndex(0)
  }


  useEffect(() => {
    const route = routes[activeIndex];
    if (route.onlyAdmin === true) {
      return navigate(route.component);
    } else {
      navigate("/user-vacations")
    }
  }, [activeIndex]);

  const items = routes
    .filter((route: IRoute) => route.label)
    .map((route: IRoute) => ({
      label: route.label,
      icon: route.icon,
      path: route.path,
    }));

  const userRole = localStorage.getItem("role")
  const userToken = localStorage.getItem("token")
  const userFirstName = localStorage.getItem("firstName")

  const filteredRoutes = routes.filter((route: IRoute) => {
    if (route.onlyAdmin && userRole !== "admin") {
      return false;
    }
    return true;
  });

  return (
    <div className='appsize'>
      <div className='top-container'>
        <div className='main'>
          {userToken ? (
            <div style={{ display: "flex", justifyContent: "space-between", margin: "auto" }}>
              <div >
                <Avatar icon="pi pi-user" size="normal" style={{ backgroundColor: '#176B87', color: '#ffffff' }} shape="circle" /><span className='welcome' style={{ color: "#808080" }}> Welcome back {userFirstName}</span>
              </div>
              <img style={{ marginBottom: "3%", marginTop: "1%", marginRight: "6%" }} className='logoImg' src={logoImage} alt="Image" width="180" />
              <div>
                <button className='logoutB' onClick={logoutHandler}> <i className="pi pi-sign-out"></i> Log Out</button>
              </div>
            </div>
          ) : (
            <span>
              <img style={{ marginBottom: "3%", marginTop: "1%", marginLeft: "1%" }} className='logoImg' src={logoImage} alt="Image" width="180" />
            </span>
          )}
        </div>
        <div>
          {userRole === "admin" && (
            <TabMenu style={{ borderRadius: "10px" }} model={items} activeIndex={activeIndex} onTabChange={onTabChange} />
          )}
        </div>
      </div>

      <div style={{ marginTop: "5%", display: "flex", justifyContent: "center" }}>
        <Routes>
          {filteredRoutes.map((route: IRoute) => (
            <Route
              key={route.key}
              path={route.path}
              element={userRole === "admin" || !route.onlyAdmin ? route.component : null}
            />
          ))}
        </Routes>
      </div>
    </div>

  )
}



export default App

