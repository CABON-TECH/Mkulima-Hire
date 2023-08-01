import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useSelector} from "react-redux";

const AuthMiddleware = (props) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate.push("/login");
        }
    }, [navigate, isAuthenticated]);

    return props.children;
}

export default AuthMiddleware;