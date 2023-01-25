import './App.scss';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Navigation from "./components/layout/Navigation/Navigation";
import Profile from "./components/pages/Homepage/Profile";
import Rentals from "./components/pages/Houses/Rentals";
import Details from "./components/pages/Details/Details";
import FavouritesPage from "./components/pages/Homepage/FavouritesPage";
import {ProviderFavourites} from "./providers/Favourites";
import "./App.scss";
import {createContext, useState} from "react";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme]= useState("light");

    const toggleTheme = () => {
        setTheme((curr) =>(curr === "light" ? "dark" : "light"));
    };
    return (   <ThemeContext.Provider value={{ theme,toggleTheme}}>
        <ProviderFavourites>

        <BrowserRouter>
            <div className="App" id={theme}>
                <div className={"switch"}>
                    <label>{theme === "light" ? "Light Mode" : "Dark Mode" }</label>
                    <ReactSwitch className={"button"} onChange={toggleTheme} checked={theme ==="dark"}/>
                </div>
                <Switch>
                    <Route path="/houses" component={Rentals}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/details/:id_casa" component={Details}/>
                    <Route path="/favourites" component={FavouritesPage}/>
                    <Redirect to={"/houses"}/>
                </Switch>
                <Navigation/>
            </div>
        </BrowserRouter>
    </ProviderFavourites>
    </ThemeContext.Provider>)

}
export default App;
