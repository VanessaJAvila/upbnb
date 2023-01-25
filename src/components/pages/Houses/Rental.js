import "./Rental.scss";
import {faStar, faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useFavourites} from "../../../providers/Favourites";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Rental(props) {

    const [details, setDetails] = useState([]);
    const {favourites, setFavourites, isFavourite, toogleFavourite} = useFavourites();


    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas`)
            .then(response => setDetails(response.data.data));
    }, [])

    return <div className={"rental"}>
        <div className={"homes-img"}>
            <Link to={"/details/" + props.id}>
                <div className={"photo"}
                     style={{backgroundImage: `url('https://m9-frontend.upskill.appx.pt/upbnb/${props.featured_photo}')`}}/>
            </Link>
            <FontAwesomeIcon className={"heart"} onClick={() => {
                toogleFavourite(props.id)
            }} icon={isFavourite(props.id) ? faHeartSolid : faHeart}/>
        </div>
        <div className={"info"}>
            <div className={"location-host"}>
                <h3>{props.city}, {props.country}</h3>
                <h4 id={"host"}>Anfitrião {props.host_type}</h4>
                <div className={"price"}>
                    <h5 id={"cost"}>{props.price}€</h5>
                    <p>noite</p>
                </div>
            </div>
            <div className={"rating"}>
                <h3>{props.rating}</h3><FontAwesomeIcon icon={faStar}/>
            </div>
        </div>

    </div>;
}

export default Rental;