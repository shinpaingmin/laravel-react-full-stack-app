import { Navigate, Outlet } from "react-router"
import { useStateContext } from "../contexts/ContextProvider"

const GuestLayout = () => {
  const {token} = useStateContext();
  if (token) {
    return <Navigate to="/"/>
  }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default GuestLayout
