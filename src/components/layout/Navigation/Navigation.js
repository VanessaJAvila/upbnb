import "./Navigation.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {NavLink} from "react-router-dom";
import logo from "./logo_menu.svg";


function Navigation() {
    return <nav className="navegacao">
        <div className="search">
            <NavLink to={"/houses"} className="search-icon"><FontAwesomeIcon
                icon={faMagnifyingGlass}/></NavLink>
        </div>
        <NavLink to={"/profile"} className={"User-Profile"}><img src={logo} alt="logo upbnb"/></NavLink>
        <div className="heart-icon">
            <NavLink to={"/favourites"}><FontAwesomeIcon icon={faHeart}/></NavLink>
        </div>
    </nav>;
}

export default Navigation;