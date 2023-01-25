import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartSolid, faStar} from "@fortawesome/free-solid-svg-icons";
import "./Profile.scss";
import {Link} from "react-router-dom";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {useFavourites} from "../../../providers/Favourites";

function Profile() {
    const [bookings, setBookings] = useState(null);
    const [oldBookings, setOldBookings] = useState(null);
    const {isFavourite, toogleFavourite} = useFavourites();

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/current')
            .then(results => {
                setBookings(results.data.data);
            })
    }, []);

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/past')
            .then(results => {
                setOldBookings(results.data.data);
            })
    }, []);

    if (!bookings)
        return null;

    if (!oldBookings)
        return null;

    return <div className={"homepage"}>

        <div className={"text"}>
            <h1>Bem-vindo(a)</h1>
            <h2 id={"profile"}>Ao seu perfil</h2>
            <h3 id={"bookings"}>As minhas reservas</h3>
        </div>
        <div className={"current"}>
            {bookings.map((b, idx) => {
                return <React.Fragment key={b.id}>
                    {idx > 0}
                    <div className={"booking"}>
                        <Link to={"Details/" + b.id}>
                            <div className={"photo"}
                                 style={{backgroundImage: `url('https://m9-frontend.upskill.appx.pt/upbnb/${b.featured_photo}')`}}/>
                        </Link>
                          <FontAwesomeIcon className={"heart"} onClick={() => {
                                toogleFavourite(b.id)
                            }} icon={isFavourite(b.id) ? faHeartSolid : faHeart}/>

                        <div className={"info"}>
                            <div className={"location-host"}>
                                <h3>{b.city}, {b.country}</h3>
                                <h4>{b.time.replace(/\b0/g, '')}</h4>
                                <div className={"price"}>
                                    <h5>{b.price}€</h5>
                                </div>
                            </div>
                            <div className={"rating"}>
                                <h3>{b.rating}</h3><FontAwesomeIcon icon={faStar}/>
                            </div>
                        </div>

                    </div>
                </React.Fragment>
            })}
        </div>

        <div className={"Old-bookings"}>
            <h3>Reservas passadas</h3>
            <div className={"past"}>
                {oldBookings.map((o, idx) => {
                    return <React.Fragment key={o.id}>
                        {idx > 0}
                        <div className={"booking"}>
                            <Link to={"Details/" + o.id}>
                                <div className={"photo"}
                                     style={{backgroundImage: `url('https://m9-frontend.upskill.appx.pt/upbnb/${o.featured_photo}')`}}/>
                                <FontAwesomeIcon className={"heart"} onClick={() => {
                                    toogleFavourite(o.id)
                                }} icon={isFavourite(o.id) ? faHeartSolid : faHeart}/>
                            </Link>
                            <div className={"info"}>
                                <div className={"location-host"}>
                                    <h3>{o.city}, {o.country}</h3>
                                    <h4>{o.time.replace(/\b0/g, '')}</h4>
                                </div>
                                <div className={"price"}>
                                    <h5>{o.price}€</h5>
                                </div>
                                <div className={"rating"}>
                                    <h3>{o.rating}</h3><FontAwesomeIcon icon={faStar}/>
                                </div>
                            </div>


                        </div>
                    </React.Fragment>
                })}

            </div>
        </div>
    </div>


}

export default Profile;