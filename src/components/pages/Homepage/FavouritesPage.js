import {Link} from "react-router-dom";
import "./FavouritesPage.scss";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {faStar, faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {useFavourites} from "../../../providers/Favourites";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function FavouritesPage(props) {

    const {favourites,setFavourites, isFavourite, toogleFavourite} = useFavourites();
    const [rentals_list, setRentalsList] = useState(null);

    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas`, {
            params: {
                ids: favourites.join(",")
            }
        })
            .then(response => setRentalsList(response.data.data));
    }, []);

    if (!rentals_list) return null;

    return <div className={"FavouritesPage"}>
        <h1>Favoritos</h1>
        {rentals_list.map((l => {
                return <div key={l.id} className={"bookmark"}>
                    <Link to={"Details/" + l.id}>
                        <img src={'https://m9-frontend.upskill.appx.pt/upbnb/' + l.featured_photo}/>
                        <div className={"heart"}><FontAwesomeIcon onClick={() => {
                            toogleFavourite(l.id)
                        }} icon={isFavourite(l.id) ? faHeartSolid : faHeart}/></div>
                    </Link>
                    <div className={"infos"}>
                        <h3>{l.city}</h3>
                        <h4 id={"host"}>Anfitrião {l.host_type}</h4>
                        <div className={"price"}>
                            <h5 id={"cost"}>{l.price}€</h5>
                            <p>noite</p>
                        </div>
                        <div className={"rating"}>
                            <h3>{l.rating}</h3><FontAwesomeIcon icon={faStar}/>
                        </div>
                    </div>
                </div>
            }))
    }
    </div>
}

export default FavouritesPage;