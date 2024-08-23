import React, { createContext, useContext, useState } from 'react';
import Web3 from 'web3';

// Define the shape of the context data
interface WalletContextProps {
    web3: Web3 | null;
    isConnected: boolean;
    connectedAccount: string | null;
    balance: string | null;
    error: string | null;
    connectWallet: () => Promise<void>;
}

// Create the context
const WalletContext = createContext<WalletContextProps | undefined>(undefined);

// Create the provider component
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [isConnected, setConnected] = useState(false);
    const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const connectWallet = async () => {
        try {
            if (window.ethereum && window.ethereum.isMetaMask) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                const accounts = await web3Instance.eth.getAccounts();
                setConnectedAccount(accounts[0]);
                setConnected(true);

                const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
                const balanceInEth = Web3.utils.fromWei(balanceWei, "ether");
                setBalance(balanceInEth);
            } else {
                setError("Please install MetaMask");
            }
        } catch (err) {
            setError('An error occurred while connecting to MetaMask. Please try again.');
            console.error(err);
        }
    };

    return (
        <WalletContext.Provider value={{ web3, isConnected, connectedAccount, balance, error, connectWallet }}>
    {children}
    </WalletContext.Provider>
);
};

// Custom hook to use the WalletContext
export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
