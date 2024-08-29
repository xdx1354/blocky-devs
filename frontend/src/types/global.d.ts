import { MetaMaskProvider } from "web3";
import React from "react";


declare global {
    interface Window {
        ethereum: MetaMaskProvider;
    }

    interface IntrinsicElements {
        'gecko-coin-ticker-widget': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
    }
}
