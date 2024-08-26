import { Button } from '../components/ui/button';
import React, {FC, useEffect, useState} from 'react';
import '../styles/App.css';
import '../styles/tailwind.css';
import {useNavigate} from "react-router";
import {ExchangeForm} from "../components/ExchangeForm";
import {useAccount} from "wagmi";
import { fetchTransactions } from '../api/transactionsApi';
import { Transaction } from '../types/types';



const DEX: FC = () => {

    const[ethPrice, setEthPrice] = useState<number>();

    const navigate = useNavigate();
    const { address, isConnected } = useAccount();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleBack = () => {
        console.log('isConnected', isConnected);
        navigate('/');
    }


    const fetchPrice = async () => {
        try {
            const apiKey = process.env.REACT_APP_COINGECO_API_KEY;
            if (!apiKey) {
                throw new Error('API key is missing');
            }

            const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-pro-api-key': apiKey,
                },
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setEthPrice(data.ethereum.usd);
            console.log(data.ethereum.usd); // You can now use the fetched data

        } catch (err) {
            console.error('Error fetching price:', err);
        }
    };

    const loadTransactions = async () => {
        try {
            const data = await fetchTransactions();
            setTransactions(data);
            console.log("Loaded transactions:", data); // Debugging line
        } catch (error) {
            console.error("Error loading transactions:", error);
        }
    };

    useEffect(() => {
        // Fetch the price immediately when the component mounts
        fetchPrice();
        loadTransactions();
        //TODO:
        // const intervalId = setInterval(fetchPrice, 10000); // 10000ms = 10s

        // Cleanup function to clear the interval when the component unmounts
        // return () => clearInterval(intervalId);
    }, []);

    return (
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
                    <div className="border border-gray-200 rounded-md p-6 min-h-80 min-w-fit">
                        <p>ETH/USD: {ethPrice}</p>
                    </div>
                </div>



                <div className="border border-gray-200 rounded-md p-6 min-h-80 min-w-fit">
                        <ul>
                            {transactions.map((transaction) => (
                                <li key={transaction.id} className="p-2 border-b border-gray-200">
                                    ID: {transaction.id}, Sender: {transaction.transactionSender},
                                    Amount: {transaction.ethAmount} ETH
                                </li>
                            ))}
                        </ul>

                </div>

                <div className="border border-gray-200 rounded-md p-6 min-h-80 min-w-fit">
                    NFT
                </div>
            </div>

            <Button
                variant="destructive"
                onClick={handleBack}
                className="text-lg py-3 px-6"
            >
            Back
                </Button>

                <Button
                    variant="destructive"
                    onClick={loadTransactions}
                    className="text-lg py-3 px-6"
                >
                    Fetch transactions
                </Button>


        </div>
    );
};


export default DEX;
