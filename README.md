# Blocky-devs Project

## Functionalities
- **Connecting Web3 Wallet:** Integrate with Web3 wallets using WalletConnect.
- **Fetching ETH/USD Price:** Retrieve ETH/USD price from CoinGecko API.
- **Trading ETH for USD:** Execute trades on the Sepolia test network.
- **Storing Transactions:** Save transactions in a PostgreSQL database.
- **Fetching Transactions:** Server-side sorting, filtering, and pagination for transaction data.

## Technologies
- **Backend:** Spring Boot (Java)
- **Database:** PostgreSQL
- **Frontend:** React (TypeScript)
- **Smart Contracts:** Solidity
- **Web3 Operations:** WalletConnect, Web3.js, Wagmi
- **UI Libraries:** shadcn/ui, react-spinners

## Setup

### 1. Colone the repository
`git clone https://github.com/xdx1354/blocky-devs.git`

### 2. Create .env File
Rename `.env.example` to `.env` and update the following variables:
- `REACT_APP_COINGECKO_API_KEY`: Obtain from [CoinGecko API](https://www.coingecko.com/en/api).
- `REACT_APP_WALLET_PROJECT_ID`: Get your project ID from [WalletConnect](https://walletconnect.com/).
- `REACT_APP_RPC_KEY`: Acquire an RPC key from [QuickNode](https://www.quicknode.com/).

### 3. Run Docker
Execute `docker-compose up --build` in the root project directory.

### 4. Open Web App
If `FRONTEND_PORT=3000` is set in `.env`, access the app at [http://localhost:3000/](http://localhost:3000/).

## Using the App
1. **Login:** Connect using MetaMask or another supported wallet.
2. **Navigate to DEX:** Click the *Go to DEX* button.
3. **Interface Overview:**
   - **Top Left:** Exchange component.
   - **Top Right:** Price component showing ETH/USD price.
   - **Bottom:** Data table with completed transactions.

## Known Issues

### API Fetching
- **Rate Limits:** CoinGecko’s free API plan sometimes fails due to request limits, despite the stated limit of 30 requests per minute.
- **CORS Errors:** Occasionally, CORS policy errors occur.

### Wallet `useBalance` Hook
- **Balance Refresh:** The balance should auto-refresh after a transaction but doesn’t. I'm using wagmi's `useBalance()` hook with `refetch()`:
`const { data, isError, isLoading, refetch } = useBalance({address: address});`
and calling it after getting transaction reply in `ExchangeContex.tsx`, but it seems to have no effect.
This bug might lead to errors.


