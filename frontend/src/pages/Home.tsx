import { Button } from '../components/ui/button';
import React, { FC, useState } from 'react';
import '../styles/App.css';
import '../styles/tailwind.css';
import { useNavigate } from "react-router";
import { Web3 } from "web3";
import {undefined} from "zod";
import useWallet from "../utils/useWallet";

const Home: FC = () => {
    const navigate = useNavigate();

    const {
        connectedAccount,
        error,
        balance,
        connectWallet,
        isConnected
    } = useWallet();


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-600 text-white">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold">Connect Wallet</h1>
                <h3 className="text-2xl">MetaMask</h3>
            </header>
            <div>
                {!isConnected && <Button
                                                variant="destructive"
                                                onClick={connectWallet}
                                                className="text-lg py-3 px-6"
                                            >
                                                Connect
                                            </Button>
                }


                {error && <p className="text-red-500 mt-4">{error}</p>}

                <p>Connected Account: {connectedAccount}</p>
                <p>Balance: {balance} ETH</p>
            </div>
            { isConnected && <Button onClick={() => navigate('/dex')}> Go to DEX </Button>}

        </div>
    );
};

export default Home;
