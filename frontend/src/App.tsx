import React, { useState } from "react";
import { Button } from "./components/ui/button"
import logo from "./logo.svg";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DEX from "./pages/dex";
import {WalletProvider} from "./utils/WalletContext";
function App() {
    const [count, setCount] = useState(0);



    return (
        <WalletProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dex" element={<DEX />} />
                </Routes>
            </Router>
        </WalletProvider>
        // <Home/>
    );
}

export default App;