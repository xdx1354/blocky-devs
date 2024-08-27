export interface Transaction {
    id: number;
    transactionSender: string;
    ethAmount: number;
    erc20Amount: number;
    exchangeRate: number;
    transactionDate: Date;
}

export interface TransactionDTO {
    sender: string;
    ethAmount: string;
    tokenAmount: string;
    exchangeRate:  string;
    transactionDate: string;
}
