import React, {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card";


const PriceCard: React.FC = () => {

    const[ethPrice, setEthPrice] = useState<number>();

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
            console.log(data.ethereum.usd);

        } catch (err) {
            console.error('Error fetching price:', err);
        }
    };


    useEffect(() => {
        fetchPrice();
        const intervalId = setInterval(fetchPrice, 10000); // 10000ms = 10s
        return () => clearInterval(intervalId);
    }, []);

    return (

        <Card className="w-100 h-60 ml-5 bg-black text-white">
            <CardHeader>
                <CardTitle >ETH/USD</CardTitle>
                <CardDescription>ETH/USD price is provided by Coingeco API</CardDescription>
            </CardHeader>
            <CardContent className="font-bold text-7xl flex flex-col mt-10">
                ${ethPrice}
            </CardContent>
        </Card>

    );
}


export default PriceCard;