import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card";
import {ExchangeForm} from "./ExchangeForm";


const ExchangeCard: React.FC = () => {

    return (

        <Card className="w-1/3 mr-5 bg-black text-white">
            <CardHeader>
                <CardTitle >Exchange</CardTitle>
                <CardDescription>Exchange ETH for USDC on Sepolia Chainlink</CardDescription>
            </CardHeader>
            <CardContent>
                <ExchangeForm/>
            </CardContent>
            <CardFooter>
                Exchange rate is provided by Chainlink.
            </CardFooter>
        </Card>

    );
}


export default ExchangeCard;