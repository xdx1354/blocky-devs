"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select"
import {
    useAccount,
    useBalance,
    useWriteContract,
    useConnect,
    useWatchContractEvent,
} from "wagmi";
import { injected } from "wagmi/connectors"
import { sepolia } from "viem/chains"
import Web3 from 'web3';
import {useEffect, useState} from "react";
import abi from "../contracts/DEX_abi.json"
import {createTransaction} from "../api/transactionsApi";
import {TransactionDTO} from "../types/types";

export function ExchangeForm() {

    const { connectAsync } = useConnect()
    const { address } = useAccount()
    const { writeContractAsync } = useWriteContract()
    const [started, setStarted] = useState(false)
    const [errors, setErrors] = useState<string>()
    const [completed, setCompleted] = useState(false)
    const { data, isError, isLoading } = useBalance({
        address: address,
    });
    const [transaction, setTransaction] = useState<TransactionDTO>()

    const balanceInETH = data ? parseFloat(Web3.utils.fromWei(data.value.toString(), 'ether')) : 0;

    /**
     * Form validation schema with errors handling
     */
    const formSchema = z.object({
        ETH_amount: z.preprocess((val) => parseFloat(val as string), z
            .number({ invalid_type_error: "Amount must be a number." })
            .positive({ message: "Amount must be positive." })
            .max(balanceInETH, {
                message: `Amount cannot exceed your balance of ${balanceInETH} ETH.`,
            })),
        currency: z.string().min(2, { message: "Currency must be selected." })
    });

    /**
     * Form definition
     */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ETH_amount: 0,
            currency: "USD",
        },
    })


    /**
     * Performs buy() operation of DEX contract which performs exchange of given amount of ETH (Sepolia) tokens for
     * USDC (custom token) based on data from chainlink oracle.
     * @param amountInETH - amount of eth in (in ETH - meaning 10^0)
     */
    const handleExchange = async (amountInETH: number) => {
        try {
            setErrors('')
            setStarted(true)
            setCompleted(false);

            if(!address) {
                await connectAsync({ chainId: sepolia.id, connector: injected()})
            }

            const amountInWei = Web3.utils.toBigInt(Web3.utils.toWei(amountInETH, 'ether'));

            const transaction = await writeContractAsync({
                chainId: sepolia.id,
                address: '0xFAda3be1C91290FFc687DA025b60BaeC8A0048Cf', // address of DEX contract
                functionName: 'buy',
                abi,
                value: amountInWei
            })

            // setCurrentTransaction(transaction);
            console.log('Transaction deployed: ',transaction);
            console.log('Waiting for confirmation...');

        } catch(err) {
            console.log(err)
            setStarted(false)
            setErrors("Payment failed. Please try again.")
        }
    }

    /**
     * Watching for Contract event containing information about:
     * - sender - the DEX contract address
     * - ethAmount - amount of eth passed for exchange (in wei)
     * - tokenAmount - token (USDC) got from the exchange (in wei)
     * - exchangeRate - ETH/USDC price (multiplied by 10^8)
     * - transactionDate - date of the transaction
     */
    useWatchContractEvent({
        address: '0xFAda3be1C91290FFc687DA025b60BaeC8A0048Cf',// address of DEX contract for watching
        abi,
        eventName: 'Transaction',
        onLogs(logs) {

            setCompleted(true);
            setStarted(false);

            const log = logs[0];

            // for some reason Log type is broken and don't see the .args object
            // @ts-ignore
            console.log('Log.data: ', raw2string(log.args));
            // @ts-ignore
            setTransaction(raw2string(log.args));

        },
        onError(error) {
            console.error('Error:', error);
        },
        syncConnectedChain: true
    });

    /**
     * UseEffect triggered by setting new transaction. Results in posting its data to the DB.
     */
    useEffect (() => {
        if (transaction) {
            try {
                const result =  createTransaction(transaction);
                console.log('Transaction posted successfully:', result);
            } catch (error) {
                console.error('Error posting transaction:', error);
            }
        } else {
            console.log('No transaction created');
        }
    }, [transaction]);

    /**
     * Parsing response data from SmartContract event to the JSON with strings
     * @param rawdata
     */
    const raw2string = (rawdata: any) => {
        const result: any = {};
        for (const [key, value] of Object.entries(rawdata)) {
            if (typeof value === 'bigint') {
                result[key] = value.toString(); // change BigInt to String for JSON
            } else {
                result[key] = value;
            }
        }

        // for (const [key, value] of Object.entries(result)) {
        //     // @ts-ignore
        //     console.log(value, typeof value); //testing datatypes
        // }

        return result;
    }

    /**
     * Handles submit of form. Executes handleExchange() function for exchanging ETH/USDC then sends response this data to the server
     * @param values - inputs of form after validation
     */
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Funkcja handleExchange powinna zwracać obiekt transakcji lub null/undefined
        handleExchange(values.ETH_amount);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="ETH_amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount of ETH</FormLabel>
                            <FormControl>
                                <Input placeholder="0" {...field} type="number" />
                            </FormControl>
                            <FormDescription>
                                An amount of ETH you want to exchange
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select desired currency" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="USDC">USDC</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select desired cryptocurrency to buy with ETH
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
