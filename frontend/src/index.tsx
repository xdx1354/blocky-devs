import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Web3ModalProvider} from "./WagmiProvider";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Web3ModalProvider>
          <App />
      </Web3ModalProvider>
  </React.StrictMode>
);


reportWebVitals();
