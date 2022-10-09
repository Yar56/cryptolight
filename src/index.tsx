import React from 'react'
import {createRoot} from "react-dom/client";
import App from './app/App';

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('rootElement is null')
}

const root = createRoot(rootElement);
root.render(<App/>);
