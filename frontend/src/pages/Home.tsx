import { Button } from '../components/ui/button';
import React, { FC, useState } from 'react';
import '../styles/App.css';
import '../styles/tailwind.css';
import { useNavigate } from "react-router";
import {useAccount} from "wagmi";


const Home: FC = () => {
    const navigate = useNavigate();

    const {address, isConnected} = useAccount();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-600 text-white">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold">Connect Wallet</h1>
                <h3 className="text-2xl">MetaMask</h3>
            </header>

            { isConnected && <Button onClick={() => {
                navigate('/dex');
                console.log('isConnected', isConnected);
            }}> Go to DEX </Button>}

            <div>
                <w3m-button label="Connect Wallet" size="md"/>
            </div>
        </div>
    );
};

export default Home;
