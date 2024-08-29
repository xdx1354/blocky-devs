import { Button } from '../components/ui/button';
import React, {FC} from 'react';
import '../styles/App.css';
import '../styles/tailwind.css';
import {useNavigate} from "react-router";
import {ExchangeForm} from "../components/ExchangeForm";
import {useAccount} from "wagmi";
import LoadingWidget from "../components/LoadingWidget";
import ExchangeProvider from "../utils/ExchangeContext";
import TransactionTable from "../components/TransactionTable";
import PriceCard from "../components/PriceCard";


const DEX: FC = () => {


    const navigate = useNavigate();
    const { address, isConnected } = useAccount();

    const handleBack = () => {
        console.log('isConnected', isConnected);
        navigate('/');
    }

    return (
        <>
            <ExchangeProvider>
                <LoadingWidget/>

                <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-600">
                    <header className="text-center mb-6">
                        <h1 className="text-8xl font-bold">DEX</h1>
                        <h3 className="text-3xl">Decentralized Exchange</h3>
                    </header>
                    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-screen space-y-6">

                        <div>
                            <h2 className="text-xl font-bold">Connection
                                status: {isConnected ? 'Connected' : 'Disconnected'}</h2>
                        </div>

                        <div className="flex flex-row justify-evenly items-center min-h-80 p-6 w-screen space-y-6">
                            <div className="border border-gray-200 rounded-md p-6 min-h-80 min-w-fit">
                                <ExchangeForm/>
                            </div>
                            <PriceCard/>
                        </div>



                        <div className="border border-gray-200 rounded-md p-6 min-h-80 min-w-fit">
                            <TransactionTable/>
                        </div>
                    </div>

                    <Button
                        variant="destructive"
                        onClick={handleBack}
                        className="text-lg py-3 px-6"
                    >
                    Back
                        </Button>

                </div>
            </ExchangeProvider>
        </>
    );
};


export default DEX;
