/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate, Outlet } from "react-router"
import { useStateContext } from "../contexts/ContextProvider"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useEffect } from "react";

const DefaultLayout = () => {
  const {user, token, setUser, setToken, notification} = useStateContext();
  console.log(user);
  if(!token) {
    return <Navigate to="/login"/>
  }
  const fetchData = async ()=> {
    try {
      const data = await axiosClient.get('/user');
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[])
  // useEffect(()=>{
  //   axiosClient.get('/user')
  //     .then((data)=>{
  //       console.log(data);
  //     })
  // },[])
  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout')
                .then(()=>{
                  setUser({});
                  setToken(null);
                  localStorage.clear();
                })
  }

  return (
    <div id="defaultLayout">
        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside>
        <div className="content">
            <header>
                <div>
                    Header
                </div>
                <div>
                    {user.name}
                    <a href="#" onClick={logout} className="btn-logout">Logout</a>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>

        {
          notification &&
          <div className="notification">
            {notification}
          </div>
        }
    </div>
  )
}

export default DefaultLayout
