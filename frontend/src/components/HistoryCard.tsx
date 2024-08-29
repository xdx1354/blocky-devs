import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card";
import TransactionTable from "./TransactionTable";


const HistoryCard: React.FC = () => {
    return (
        <Card className="p-6 min-h-80 w-4/5 bg-black text-white">
            <CardHeader>
                <CardTitle className="text-5xl">Transactions History</CardTitle>
                <CardDescription>Utilizes server side filtering, sorting and pagination</CardDescription>
            </CardHeader>
            <CardContent>
                <TransactionTable/>
            </CardContent>
        </Card>
    );
}

export default HistoryCard;