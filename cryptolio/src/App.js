import { Navbar } from "./components/Navbar/Navbar";
import {Provider} from "react-redux";
import {store} from "./store/mergeReducers";
import React, {useEffect} from "react";
import {aloha} from "./UI/Loaders/loginLoader";

function App() {
    return (
        <div>
            <Provider store={store}>
                <Navbar />
            </Provider>
        </div>
    );
}

export default App;
