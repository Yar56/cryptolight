import React, {useState} from 'react';
import './index.css';
import IconAlert from './iconAlert.svg';


const App = () => {
    const [state, setState] = useState<number>(0);
    const handle = () => {

        setState(prevState => prevState + 1)
    }
    return (
        <>
            <h1 onClick={handle}>
                go +1
            </h1>
            <div>state = {state}</div>
            <IconAlert />
        </>

    );
};

export default App;
