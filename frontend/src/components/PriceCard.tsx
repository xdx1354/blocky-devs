import React, {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card";


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
            console.log(data.ethereum.usd); // You can now use the fetched data

        } catch (err) {
            console.error('Error fetching price:', err);
        }
    };


    useEffect(() => {
        const intervalId = setInterval(fetchPrice, 5000); // 10000ms = 10s
        return () => clearInterval(intervalId);
    }, []);

    return (

        <Card>
            <CardHeader>
                <CardTitle >ETH/USD</CardTitle>
                <CardDescription>ETH/USD price is provided by Coingeco API</CardDescription>
            </CardHeader>
            <CardContent>
                <p>ETH/USD: {ethPrice}</p>
            </CardContent>
            <CardFooter>
                Price is refreshed each 5s.
            </CardFooter>
        </Card>

    );
}


export default PriceCard;