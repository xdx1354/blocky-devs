import { Button } from '../components/ui/button';
import React, { FC } from 'react';
import '../styles/tailwind.css';
import { useNavigate } from "react-router";
import {useAccount} from "wagmi";


const Home: FC = () => {
    const navigate = useNavigate();

    const {address, isConnected} = useAccount();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white">

            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold">Connect Wallet</h1>
                <h3 className="text-2xl">MetaMask</h3>
            </header>

            <div className="flex flex-col justify-evenly items-center h-1/5 p-6 w-1/5">

                <div>
                    <w3m-button label="Connect Wallet" size="md"/>
                </div>

                <div className="flex justify-center p-6">
                    {isConnected &&
                        <Button
                            onClick={() => {navigate('/dex')}}
                            className="text-xl font-bold"
                        >
                            Go to DEX
                        </Button>}
                </div>

            </div>

        </div>
    );
};

export default Home;
