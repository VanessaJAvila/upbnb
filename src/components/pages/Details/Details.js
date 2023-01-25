import "./Details.scss";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useFavourites} from "../../../providers/Favourites";
import {faStar, faCircle, faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import ac from "./ac.svg";
import dog from "./dog.svg";
import fireplace from "./fireplace.svg";
import microwave from "./microwave.svg";
import smoking from "./smoking.svg";
import tv from "./tv.svg";
import washer from "./washer.svg";
import wifi from "./wifi.svg";

function Details(props) {
    const {id_casa} = useParams();
    const [details, setDetails] = useState([]);
    const [features, setFeatures] = useState(null);
    const [hosts, setHostDetails] = useState({});
    const [photos, setPhotos] = useState([]);
    const [reviews, setReviews] = useState([])

    const {favourites, setFavourites, isFavourite, toogleFavourite} = useFavourites();

    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${id_casa}`)
            .then(result => {
                setDetails(result.data);
            })
    }, []);

    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${id_casa}/features`)
            .then(result => {
                setFeatures(result.data);
            })
    }, []);

    console.log(features);

    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${id_casa}/host`)
            .then(result => {
                setHostDetails(result.data);
            })
    }, []);

    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${id_casa}/photos`)
            .then(result => {
                setPhotos(result.data.photos);
            })
    }, []);

    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${id_casa}/reviews`)
            .then(result => {
                setReviews(result.data.reviews);
            })
    }, []);

    if (!details) return null;

    if (!features) return null;

    if (!hosts) return null;

    if (!photos) return null;

    if (!reviews) return null;

    return <div className={"Details"}>
        <div className={"home"}>
            <h1>{details.title}</h1>
            <div className={"rating"}><FontAwesomeIcon className={"star"} icon={faStar}/>
                <h2>{details.rating}</h2>
                <div className={"circle"}><FontAwesomeIcon icon={faCircle}/></div>
                <h2>{details.city},{details.country}</h2>
            </div>
            <div className={"photo"}>
                <img src={'https://m9-frontend.upskill.appx.pt/upbnb/' + details.featured_photo}/>
                <div className={"heart"}><FontAwesomeIcon onClick={() => {
                    toogleFavourite(details.id)
                }} icon={isFavourite(details.id) ? faHeartSolid : faHeart}/>
                </div>
            </div>
            <div className={"price"}>
                <h2>{details.price}€</h2>
                <p>noite</p>
            </div>
            <p className={"description"}>A Casa localizada na periferia
                oferece vistas excepcionais sobre o lago e as suas actividades. Idealmente
                posicionado num terreno de 3 hectares para uma estadia tranquila ao ar livre.
                Uma total intimidade proposta sem vis-à-vis, sem bairro, cercada pela natureza.
                A poucos minutos da propriedade pode desfrutar de uma variedade de atividades,Catamarã, esqui aquático,
                jetski, pesca, etc. estão ao seu alcance.</p>
            <div>
                {features.features.includes("airConditioner") && <img className={"available"} src={ac}/>}
                {features.features.includes("petsAllowed") && <img className={"available"} src={dog}/>}
                {features.features.includes("tv") && <img className={"available"} src={tv}/>}
                {features.features.includes("microwave") && <img className={"available"} src={microwave}/>}
                {features.features.includes("wifi") && <img className={"available"} src={wifi}/>}
                {features.features.includes("fireplace") && <img className={"available"} src={fireplace}/>}
                {features.features.includes("washingMachine") && <img className={"available"} src={washer}/>}
                {features.features.includes("smokingAllowed") && <img className={"available"} src={smoking}/>}
            </div>
            <div>
                {!features.features.includes("airConditioner") && <img className={"not-available"} src={ac}/>}
                {!features.features.includes("petsAllowed") && <img className={"not-available"} src={dog}/>}
                {!features.features.includes("tv") && <img className={"not-available"} src={tv}/>}
                {!features.features.includes("microwave") && <img className={"not-available"} src={microwave}/>}
                {!features.features.includes("wifi") && <img className={"not-available"} src={wifi}/>}
                {!features.features.includes("fireplace") && <img className={"not-available"} src={fireplace}/>}
                {!features.features.includes("washingMachine") && <img className={"not-available"} src={washer}/>}
                {!features.features.includes("smokingAllowed") && <img className={"not-available"} src={smoking}/>}
            </div>
            <h3>Sobre o anfitrião</h3>
            <div className={"about"}>
                <div className={"host"}>
                    <img src={'https://m9-frontend.upskill.appx.pt/upbnb/' + hosts.photo}/>
                    <h3>{hosts.name}</h3>
                </div>
                <div className={"host-rating"}>
                    <FontAwesomeIcon icon={faStar}/>
                    <h4>{hosts.rating}</h4>
                </div>
                <p>Somos uma familia que adora velejar, grande parte do ano estamos dedicados a essa paixão,
                    gostamos da arte do bem receber, de partilhar sugestões de sítios
                    a imperdíveis ao nosso redor e dar a conhecer histórias e costumes locais. </p>
            </div>
            <h3>Galeria</h3>
            <div className={"gallery"}>

                {photos.map((p, i) => {
                    if (i === 0)
                        return;
                    return <img src={`https://m9-frontend.upskill.appx.pt/upbnb/${p}`}/>
                })}
            </div>
            <div className={"comments"}>
                <h3>Comentários</h3>
                {reviews.map(r => (
                    <div className={"reviews"}>
                        <div className={"reviews-photo"}>
                            <img src={`https://m9-frontend.upskill.appx.pt/upbnb/${r.photo}`}/>
                        </div>
                        <div className={"reviews-data"}>
                            <h2>{r.name} </h2>
                            <h3>{r.date}</h3>
                        </div>
                        <p>{r.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default Details;
