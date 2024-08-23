import { Button } from '../components/ui/button';
import React, {FC} from 'react';
import '../styles/App.css';
import '../styles/tailwind.css';




const Home: FC = () => {

    const handleClick = () => {
        console.log('clicked');
    }

    return (
       <div>
            <Button className="App-link" variant="destructive" onClick={handleClick}>DELETE</Button>
       </div>
    );
}

export default Home;
