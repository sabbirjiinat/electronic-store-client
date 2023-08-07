import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../components/shared/Hooks/UseAuth";
import Loader from "../components/shared/Loader/Loader";

const PrivateRoute = ({children}) => {
    const {user,loading} = UseAuth()
    const location = useLocation()
    if(loading){
        return <Loader/>
    }
    else if(user){
        return children
    }
    return <Navigate state={{from:location}} replace to='/login'></Navigate>
};

export default PrivateRoute;