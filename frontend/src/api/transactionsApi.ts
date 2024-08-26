import { Transaction } from '../types/types';

export const fetchTransactions = async (): Promise<Transaction[]> => {
    try {
        console.log('Fetching transactions');
        const response = await fetch('http://localhost:8080/v1/transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data: Transaction[] = await response.json();
        console.log('Fetched: ',data);
        return data;
    } catch (err) {
        console.error('Error fetching transactions:', err);
        return [];
    }
};
