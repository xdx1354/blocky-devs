import { MetaMaskProvider } from "web3";
import React from "react";

/// <reference types="react-scripts" />

declare global {
    interface Window {
        ethereum: MetaMaskProvider;
    }

    interface IntrinsicElements {
        'gecko-coin-ticker-widget': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
    }
}
