import { useState, useEffect } from "react";
import Web3 from "web3";

// Define the type for the return object from the hook
interface UseWalletReturnType {
    web3: Web3 | null;
    provider: string | null;
    isConnected: boolean;
    error: string | null;
    accounts: string[] | null;
    connectedAccount: string | null;
    balance: string | null;
    connectWallet: () => Promise<void>;
}

const useWallet = (): UseWalletReturnType => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [provider, setProvider] = useState<string | null>(null);
    const [isConnected, setConnected] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [accounts, setAccounts] = useState<string[] | null>(null);
    const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);

    const connectWallet = async () => {
        try {
            if (window.ethereum && window.ethereum.isMetaMask) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                // Request accounts from MetaMask
                const allAccounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];
                setAccounts(allAccounts);
                setConnectedAccount(allAccounts[0]);
                setConnected(true);

                // Fetch balance
                const balanceWei = await web3Instance.eth.getBalance(allAccounts[0]);
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

    return {
        web3,
        provider,
        isConnected,
        error,
        accounts,
        connectedAccount,
        balance,
        connectWallet,
    };
};

// export default useWallet;
