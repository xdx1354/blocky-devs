import React, { useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DEX from "./pages/dex";



function App() {

    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dex" element={<DEX />} />
                </Routes>
            </Router>
    );
}

export default App;