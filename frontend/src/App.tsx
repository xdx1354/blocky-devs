import { useState } from "react";
import { Button } from "./components/ui/button"
import logo from "./logo.svg";
import Home from "./pages/Home";

function App() {
    const [count, setCount] = useState(0);
    return (
        // <div className="App">
        //     <header className="h-screen flex flex-col items-center justify-center">
        //         <img
        //             src={logo}
        //             className="w-[40vmin] animate-[spin_10s_linear_infinite]"
        //             alt="logo"
        //         />
        //         <p>
        //             Edit <code>src/App.tsx</code> and save to reload.
        //         </p>
        //         <Button asChild variant="link">
        //             <a
        //                 href="https://reactjs.org"
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //             >
        //                 Learn React
        //             </a>
        //         </Button>
        //         <Button
        //             variant="destructive"
        //             onClick={() => setCount((count) => count + 1)}
        //         >
        //             Count is {count}
        //         </Button>
        //     </header>
        // </div>

        <Home/>
    );
}

export default App;