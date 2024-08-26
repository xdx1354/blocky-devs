
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import {cookieStorage, createStorage, http, WagmiProvider} from 'wagmi'
import {sepolia} from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactNode} from "react";

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Your WalletConnect Cloud project ID
const projectId = process.env.REACT_APP_WALLET_PROJECT_ID;

// 2. Create wagmiConfig
const metadata = {
    name: 'bloky-devs',
    description: 'AppKit Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [sepolia] as const

// const config = defaultWagmiConfig({
//     chains,
//     projectId,
//     metadata,
//     // ssr: true,
//     syncConnectedChain: true,
//     transports: {
//         [sepolia.id]: http(process.env.REACT_APP_RPC_KEY!),
//     },
// })

export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    transports: {
        [sepolia.id]: http(process.env.REACT_APP_RPC_KEY!),
    },
});

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    chains,
    defaultChain: sepolia
    // enableAnalytics: true, // Optional - defaults to your Cloud configuration
    // enableOnramp: true // Optional - false as default
})

// Define props interface
interface Web3ModalProviderProps {
    children: ReactNode;
}

export function Web3ModalProvider({ children } : Web3ModalProviderProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}
