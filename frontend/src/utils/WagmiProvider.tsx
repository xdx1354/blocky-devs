
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import {http, WagmiProvider} from 'wagmi'
import {sepolia} from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactNode} from "react";


const queryClient = new QueryClient()

const projectId = process.env.REACT_APP_WALLET_PROJECT_ID;


const metadata = {
    name: 'bloky-devs',
    description: 'AppKit Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [sepolia] as const

export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    transports: {
        [sepolia.id]: http(process.env.REACT_APP_RPC_KEY!),
    },
});

createWeb3Modal({
    wagmiConfig: config,
    projectId,
    chains,
})

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
