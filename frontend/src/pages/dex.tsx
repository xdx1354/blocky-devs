import { Button } from '../components/ui/button';
import React, {FC} from 'react';
import '../styles/App.css';
import '../styles/tailwind.css';
import { useWallet } from "../utils/WalletContext";
import {useNavigate} from "react-router";



const DEX: FC = () => {

    const {
        connectedAccount,
        error,
        balance,
        connectWallet,
        isConnected
    } = useWallet();

    const navigate = useNavigate();

    const handleBack = () => {
        console.log('isConnected', isConnected);
        navigate('/');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-600">
            <header className="text-center mb-6">
                <h1 className="text-8xl font-bold">DEX</h1>
                <h3 className="text-3xl">Decentralized Exchange</h3>
            </header>
            <div className="flex flex-col items-center justify-center min-h-screen p-6 w-screen space-y-6">
                <div>
                    <h2 className="text-xl font-bold">Connection status: {isConnected?'Connected':'Disconnected'}</h2>
                </div>
                <Button
                    variant="destructive"
                    onClick={handleBack}
                    className="text-lg py-3 px-6" // Add custom classes to enlarge the button
                >
                    Back
                </Button>

                <Button
                    variant="default"
                    onClick={() => console.log("isConnected", connectedAccount)}
                    className="text-lg py-3 px-6" // Add custom classes to enlarge the button
                >
                    Test connection
                </Button>

            </div>
        </div>
    );
};



export default DEX;
