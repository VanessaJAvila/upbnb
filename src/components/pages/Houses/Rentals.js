import "./Rentals.scss";
import Rental from "./Rental";
import {useEffect, useState} from "react";
import axios from "axios";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Rentals() {

    const [filter, setFilter] = useState("");
    let [page, setPage] = useState(1);
    const [limitpages, setLimitPages] = useState(1)
    const [rentals_list, setRentalsList] = useState([]);

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas')
            .then(response =>
                setLimitPages(response.data.pages))
    }, []);


    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas',
            {params: {page, search: filter}})
            .then(response => setRentalsList(page === 1 ? response.data.data : [...rentals_list, ...response.data.data]));
    }, [page, filter]);


    useEffect(() => {
        setPage(1);
    }, [filter])

    return <div className={"container"}>
        <div className={"searching"}>
            <FontAwesomeIcon className={"s-icon"} icon={faMagnifyingGlass}/>
            <input className={"search"}
                   type="text"
                   placeholder={"Procurar"}
                   onChange={e => setFilter(e.target.value)}
            />
        </div>
        <div className={"rental-list"}>
            {!rentals_list && <p>Loading</p>}
            {rentals_list && <>
                {rentals_list.length === 0 && <p className={"noResults"}>0 Results</p>}
                {rentals_list.map(r => <Rental
                    key={r.id}
                    {...r}
                />)}
            </>}
        </div>
        <div className={"results"}>
            {page < limitpages &&
                <div className={"pagination"} onClick={() => setPage(page + 1)}>
                    {rentals_list.length > 0 && <p>mais resultados</p>}
                </div>}
        </div>
    </div>
}

export default Rentals;