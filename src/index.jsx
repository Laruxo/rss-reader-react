import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import './styles/index.scss';
import App from './components/App';

const load = () => render((<AppContainer><App/></AppContainer>), document.getElementById('root'));

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App', load);
}

load();
