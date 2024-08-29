import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {useExchangeContext} from "../utils/ExchangeContext";

export const ExchangeForm: React.FC = () => {

    const { started, completed, errors, transaction, handleExchange, data, ETHBalance } = useExchangeContext();

    const formSchema = z.object({
        ETH_amount: z.preprocess((val) => parseFloat(val as string), z
            .number({ invalid_type_error: "Amount must be a number." })
            .positive({ message: "Amount must be positive." })
            .max(ETHBalance, {
                message: `Amount cannot exceed your balance of ${ETHBalance} ETH.`,
            })),
        currency: z.string().min(2, { message: "Currency must be selected." })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { ETH_amount: 0, currency: "USDC" },
    });

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
                            <FormDescription>An amount of ETH you want to exchange</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Currency</FormLabel>
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
                            <FormDescription>Select desired cryptocurrency to buy with ETH</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={started}>Submit</Button>
            </form>
        </Form>
    );
};
