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

export type TransactionTableData = {
    id: number;
    transactionDate: string;
    exchangeRate: string;
    transactionSender: string;
    erc20Amount: string;
    ethAmount: string;
}

export type Sort = {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
};

export type Pageable = {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
};

export type PaginatedResponse = {
    totalPages: number;
    totalElements: number;
    pageable: Pageable;
    size: number;
    content: TransactionTableData[];
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
};