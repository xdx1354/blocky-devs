import React, {useState, useEffect, useCallback} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    PaginationState,
} from "@tanstack/react-table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import {TransactionTableData, PaginatedResponse} from "../types/types";
import {useExchangeContext} from "../utils/ExchangeContext";
import Web3 from "web3";

export const columns: ColumnDef<TransactionTableData>[] = [
    {
        id: "select",
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "transactionSender",
        header: "Transaction Sender",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("transactionSender")}</div>
        ),
    },
    {
        accessorKey: "transactionDate",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("transactionDate")}</div>,
    },
    {
        accessorKey: "exchangeRate",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Exchange Rate
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("exchangeRate")}</div>,
    },
    {
        accessorKey: "erc20Amount",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ERC20 Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("erc20Amount")}</div>,
    },
    {
        accessorKey: "ethAmount",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ETH Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("ethAmount")}</div>,
    },
];

export function TransactionsTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<string>("");
    const [data, setData] = useState<TransactionTableData[]>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [pageCount, setPageCount] = useState<number>(1);
    const {completed} = useExchangeContext();

    const formatWeiValue = useCallback(
        (weiValue: string, decimals: number, fractionDigits: number): string => {
            const ethValue: string = Web3.utils.fromWei(weiValue, decimals);
            const roundedValue: string = parseFloat(ethValue).toFixed(fractionDigits);

            if (parseFloat(weiValue) > 0 && roundedValue === "0.00000000") {
                return "<0.00000001";
            } else {
                return roundedValue;
            }
        },
        []
    );


    const fetchData = useCallback(async () => {
        const sortBy = sorting.map(sort => sort.id).join(',');
        const sortDirection = sorting.map(sort => sort.desc ? 'DESC' : 'ASC').join(',');

        const response = await fetch(
            `http://localhost:8080/v1/transactions?pageNumber=${pagination.pageIndex}&pageSize=${pagination.pageSize}&sortDirection=${sortDirection}&sortBy=${sortBy}&filterBy=${columnFilters}`
        );
        const result: PaginatedResponse = await response.json();

        const convertedData = result.content.map(tx => ({
            ...tx,
            ethAmount: formatWeiValue(tx.ethAmount, 18, 8),
            erc20Amount: formatWeiValue(tx.erc20Amount, 18, 8),
            exchangeRate: formatWeiValue(tx.exchangeRate, 8, 4),
        }));

        setData(convertedData);
        setPageCount(result.totalPages);
    }, [sorting, columnFilters, pagination.pageIndex, pagination.pageSize, formatWeiValue, completed]);

    useEffect(() => {
        console.log("Refetching table data!");
        fetchData();
    }, [sorting, columnFilters, pagination.pageIndex, pagination.pageSize, completed, fetchData]);


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            pagination
        },
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        pageCount: pageCount
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter senders addresses..."
                    value={columnFilters}
                    onChange={(event) => {
                        setColumnFilters(event.target.value.trim());
                    }}
                    className="max-w-sm bg-black text-white border-gray-400"
                />
            </div>
            <div className="rounded-md border border-gray-400 font-medium">
                <Table >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-center py-4 w-full">
                <div className="w-1/3 flex justify-center font-black">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Back
                    </Button>
                </div>
                <div className="w-1/3 flex justify-center">
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                </div>
                <div className="w-1/3 flex justify-center font-black">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default TransactionsTable;
