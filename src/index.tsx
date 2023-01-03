import React from 'react';
import ReactDOM from 'react-dom';
import {
  gripApp,
  getKeplrAccountProvider,
  Config,
} from '@stakeordie/griptape.js';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const config: Config = {
  restUrl: 'https://api.pulsar.scrttestnet.com/',
  chainId: 'pulsar-2',
};
const provider = getKeplrAccountProvider();

function runApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

gripApp(config, provider, runApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
