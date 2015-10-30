import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {init} from './commons/Router';

function main() {
    init();
    ReactDOM.render(<App/>, document.getElementById('appRoot'));
}

main();
