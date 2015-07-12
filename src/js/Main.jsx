import App from './App';
import React from 'react';
import {init} from './commons/Router';

init();
React.render(<App/>, document.getElementById('appRoot'));
