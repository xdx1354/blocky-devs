export interface Transaction {
    id: number;
    transactionSender: string;
    ethAmount: number;
    erc20Amount: number;
    exchangeRate: number;
    transactionDate: Date;
}