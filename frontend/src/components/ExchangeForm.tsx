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
    type UseWatchContractEventParameters
} from "wagmi";
import { injected } from "wagmi/connectors"
import { sepolia } from "viem/chains"
import Web3 from 'web3';
import {useState} from "react";
import abi from "../contracts/DEX_abi.json"

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

    const [ethAmount, setEthAmount] = useState('0.01');

    const balanceInETH = data ? parseFloat(Web3.utils.fromWei(data.value.toString(), 'ether')) : 0;

    const formSchema = z.object({
        ETH_amount: z.preprocess((val) => parseFloat(val as string), z
            .number({ invalid_type_error: "Amount must be a number." })
            .positive({ message: "Amount must be positive." })
            .max(balanceInETH, {
                message: `Amount cannot exceed your balance of ${balanceInETH} ETH.`,
            })),
        currency: z.string().min(2, { message: "Currency must be selected." })
    });

    // form definition
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ETH_amount: 0,
            currency: "USD",
        },
    })


    // EXCHANGE HANDLING
    const handleExchange = async (amountInETH: number) => {
        try {
            setErrors('')
            setStarted(true)
            setCompleted(false);
            if(!address) {
                await connectAsync({ chainId: sepolia.id, connector: injected()})
            }

            const amountInWei = Web3.utils.toBigInt(Web3.utils.toWei(amountInETH, 'ether'));

            const data = await writeContractAsync({
                chainId: sepolia.id,
                address: '0xFAda3be1C91290FFc687DA025b60BaeC8A0048Cf', // address of DEX contract
                functionName: 'buy',
                abi,
                value: amountInWei
            })
            setCompleted(true)
            console.log('Transfer completed:', data)
        } catch(err) {
            console.log(err)
            setStarted(false)
            setErrors("Payment failed. Please try again.")
        }
    }

    // EXCHANGE EVENTS WATCHING

    useWatchContractEvent({
        address: '0xFAda3be1C91290FFc687DA025b60BaeC8A0048Cf',// address of DEX contract for watching
        abi,
        eventName: 'Transaction',
        onLogs(logs) {
            console.log('New logs!', logs)
        },
        onError(error) {
            console.error('Error:', error);
        },
        syncConnectedChain: true
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
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
