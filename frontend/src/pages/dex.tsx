import { Button } from '../components/ui/button';
import React, {FC} from 'react';
import '../styles/tailwind.css';
import {useNavigate} from "react-router";
import {useAccount} from "wagmi";
import LoadingWidget from "../components/LoadingWidget";
import ExchangeProvider from "../utils/ExchangeContext";
import PriceCard from "../components/PriceCard";
import ExchangeCard from "../components/ExchangeCard";
import HistoryCard from "../components/HistoryCard";


const DEX: FC = () => {


    const navigate = useNavigate();
    const { isConnected } = useAccount();

    const handleBack = () => {
        console.log('isConnected', isConnected);
        navigate('/');
    }

    return (
        <>
            <ExchangeProvider>
                <LoadingWidget/>

                <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white">
                    <header className="text-center mt-10">
                        <h1 className="text-8xl font-bold">DEX</h1>
                        <h3 className="text-3xl">Decentralized Exchange</h3>
                    </header>

                    <div className="flex flex-col items-center justify-center min-h-screen w-screen space-y-6">
                        <div className="flex flex-row justify-center items-center min-h-80 mt-10 p-1 w-2/3 space-y-1">
                            <ExchangeCard/>
                            <PriceCard/>
                        </div>
                        <HistoryCard/>
                    </div>

                    <Button variant="secondary" onClick={handleBack} className="text-lg py-3 px-6 mt-10">
                        Back to login
                    </Button>

                </div>
            </ExchangeProvider>
        </>
    );
};


export default DEX;
