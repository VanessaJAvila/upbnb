import React, {useState} from 'react';

const FavouritesContext = React.createContext();

function ProviderFavourites(props) {

    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("Favourites") || "[]"));
    const isFavourite = (house_id) => {
        return favourites.includes(house_id)
    }

    function toogleFavourite(house_id) {
        let clone = [...favourites];
        if (isFavourite(house_id)) {
            clone.splice(clone.indexOf(house_id), 1)
        } else {
            clone.push(house_id);
        }
        setFavourites(clone);
        localStorage.setItem('Favourites', JSON.stringify(clone));
    }

    return <FavouritesContext.Provider value={{favourites, setFavourites, isFavourite, toogleFavourite}}>
        {props.children}
    </FavouritesContext.Provider>;
}

function useFavourites() {
    return React.useContext(FavouritesContext);
}

export {ProviderFavourites, useFavourites};