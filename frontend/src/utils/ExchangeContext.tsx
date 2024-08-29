import React, { createContext, useContext, useState, useEffect, FC, ReactNode } from 'react';
import {useAccount, useWriteContract, useConnect, useWatchContractEvent, useBalance} from "wagmi";
import { injected } from "wagmi/connectors"
import { sepolia } from "viem/chains"
import Web3 from 'web3';
import abi from "../contracts/DEX_abi.json"
import {createTransaction} from "../api/transactionsApi";
import {TransactionDTO} from "../types/types";


export interface ExchangeContextType {
    started: boolean;
    completed: boolean;
    errors: string | undefined;
    transaction: TransactionDTO | undefined;
    handleExchange: (amountInETH: number) => Promise<void>;
    ETHBalance: number;
    data: {
                decimals: number,
                formatted: string,
                symbol: string,
                value: bigint
            } | undefined;
}

const ExchangeContext = createContext<ExchangeContextType | undefined>(undefined);

export const useExchangeContext = (): ExchangeContextType => {
    const context = useContext(ExchangeContext);
    if (!context) {
        throw new Error('useExchangeContext must be used within an ExchangeProvider');
    }
    return context;
};

const ExchangeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { connectAsync } = useConnect();
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const { data, isError, isLoading, refetch } = useBalance({address: address});
    const [ETHBalance, setETHBalance] = useState<number>(0);
    const [started, setStarted] = useState(false);
    const [errors, setErrors] = useState<string>();
    const [completed, setCompleted] = useState(false);
    const [transaction, setTransaction] = useState<TransactionDTO>();

    useEffect(() => {
        if (data) {
            const balanceInETH = parseFloat(Web3.utils.fromWei(data.value.toString(), 'ether'));
            setETHBalance(balanceInETH);
        }
    }, [data]);


    const handleExchange = async (amountInETH: number) => {
        try {
            setErrors('');
            setStarted(true);
            setCompleted(false);

            if (!address) {
                await connectAsync({ chainId: sepolia.id, connector: injected() });
            }

            const amountInWei = Web3.utils.toBigInt(Web3.utils.toWei(amountInETH, 'ether'));

            const transaction = await writeContractAsync({
                chainId: sepolia.id,
                address: '0xFAda3be1C91290FFc687DA025b60BaeC8A0048Cf',
                functionName: 'buy',
                abi,
                value: amountInWei,
            });

            try {
                refetch(); // refreshing account balance
            } catch (err) {
                console.error("Error occurred while refreshing the account balance: ", err);
            }

            console.log('Transaction deployed:', transaction);
            console.log('Waiting for confirmation...');

        } catch (err) {
            console.error(err);
            setStarted(false);
            setErrors("Payment failed. Please try again.");
        }
    };

    useWatchContractEvent({
        address: '0xFAda3be1C91290FFc687DA025b60BaeC8A0048Cf',
        abi,
        eventName: 'Transaction',
        onLogs(logs) {
            const log = logs[0];
            // @ts-ignore
            console.log('Log.data: ', raw2string(log.args));
            // @ts-ignore
            setTransaction(raw2string(log.args));

            setCompleted(true);
            setStarted(false);
        },
        onError(error) {
            setErrors('Error: no confirmation of transaction received.');
            console.error('Error:', error);
        },
        syncConnectedChain: true,
    });

    useEffect(() => {
        if(transaction) {
            createTransaction(transaction);
        }
    }, [transaction]);


    const raw2string = (rawData: any) => {
        const result: any = {};
        for (const [key, value] of Object.entries(rawData)) {
            if (typeof value === 'bigint') {
                result[key] = value.toString();
            } else {
                result[key] = value;
            }
        }
        return result;
    };

    return (
        <ExchangeContext.Provider value={{ started, completed, errors, transaction, handleExchange, data, ETHBalance }}>
            {children}
        </ExchangeContext.Provider>
    );
};

export default ExchangeProvider;
