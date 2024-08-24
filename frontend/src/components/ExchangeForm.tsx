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
import {useWallet} from "../utils/WalletContext";

export function ExchangeForm() {
    const {
        connectedAccount,
        error,
        balance,
        connectWallet,
        isConnected
    } = useWallet();

    // Parse the balance string to a number (default to 0 if balance is null or invalid)
    const parsedBalance = parseFloat(balance || '0');

    const formSchema = z.object({
        ETH_amount: z.preprocess((val) => parseFloat(val as string), z
            .number({ invalid_type_error: "Amount must be a number." })
            .positive({ message: "Amount must be positive." })
            .max(parsedBalance, {
                message: `Amount cannot exceed your balance of ${parsedBalance} ETH.`,
            })),
        currency: z.string().min(2, { message: "Currency must be selected." })
    });

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ETH_amount: 0,
            currency: "USD",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        //TODO: handle the  submit
        console.log(values)
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
