import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Checklogin() {
  const user = useSelector((state) => state.user.value);
  return (
    user.name?<Outlet/>:<Navigate to='/login'/>
  )
}

function  IsLogged(){
  const user = useSelector((state)=>state.user.value)
  return(
    user.name?<Navigate to = '/' />:<Outlet/>
  )
}

function Checkloginadmin(){
  const admin = useSelector((state)=>state.admin.value)
  return(
    admin.email?<Navigate to='/adminpanel'/>:<Outlet/>
  )
}

function Adminloged(){
  const admin = useSelector((state)=>state.admin.value)
  return(
    admin.email?<Outlet/>:<Navigate to='/admin'/>
  )
}

export {Checklogin,IsLogged,Adminloged,Checkloginadmin}
