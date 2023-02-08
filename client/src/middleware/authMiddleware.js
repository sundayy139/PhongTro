import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { path } from "../utils/path";

export const IsAdmin = ({ children }) => {
    const { token } = useSelector(state => state.auth)
    if (!token) {
        return <Navigate to={'/'} replace={true}></Navigate>
    } else {
        let decode = JSON.parse(atob(token.split('.')[1]));
        if (decode.role !== 'admin') {
            return <Navigate to={'/'} replace={true}></Navigate>
        }
    }
    return children
}

export const Auth = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth)
    if (!isLoggedIn) {
        return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>
    }
    return children
}