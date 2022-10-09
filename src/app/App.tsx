import React from 'react';
import './styles/index.scss';
import {withProviders} from "./providers";
import {Routing} from "../pages";


const App = () => {
    return <Routing/>
};

export default withProviders(App);
