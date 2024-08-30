import {Transaction, TransactionDTO} from '../types/types';

export const createTransaction = async (transactionDTO: TransactionDTO): Promise<Transaction> => {
    try {
        const response = await fetch('http://localhost:8080/v1/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify((transactionDTO)),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};
