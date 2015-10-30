import App from './App';
import React from 'react';
import {init} from './commons/Router';

function main() {
    init();
    React.render(<App/>, document.getElementById('appRoot'));
}

main();
