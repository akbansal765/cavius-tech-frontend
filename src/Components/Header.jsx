import { useNavigate } from "react-router-dom";
import { changeTheme } from "../utils/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../utils/userSlice";

function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const theme = useSelector(store => store.tasks.isLightThemeOn);

    function handleLogout(){
        dispatch(logoutUser());
        navigate("/");
    }

    function handleToggleTheme(e){
        dispatch(changeTheme(e.target.checked));
    }

    return (
        <div className={`header_component ${theme ? "light_back_color" : ""}`}>
            <p style={{ color: theme ? "black" : "" }}>Taskify - Cavius Technologies</p>

            <div className="header_controls">
                {/* Toggle Switch */}
                <label className="theme-switch">
                    <input onChange={handleToggleTheme} type="checkbox" />
                    <span className="slider"></span>
                </label>

                <button onClick={handleLogout}>LOGOUT</button>
            </div>
        </div>
    );
}

export default Header;