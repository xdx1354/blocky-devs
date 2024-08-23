import { Button } from '../components/ui/button';
import React, {FC} from 'react';
import '../styles/App.css';
import '../styles/tailwind.css';




const Home: FC = () => {

    const connectWallet = () => {
        console.log('clicked');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-600">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold">Connect Wallet</h1>
                <h3 className="text-2xl">MetaMask</h3>
            </header>
            <div>
                <Button
                    variant="destructive"
                    onClick={connectWallet}
                    className="text-lg py-3 px-6" // Add custom classes to enlarge the button
                >
                    Connect
                </Button>
            </div>
        </div>
    );
};



export default Home;
