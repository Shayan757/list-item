


import Navbar from "../Component/Navbar"
import Youritem from '../Component/Youritem';

const Home = () => {
    return (
        <div className="flex min-h-screen flex-col">
             <Navbar/> 
            <div className="flex-grow p-4">
                
                <Youritem/>
            </div>
        </div>
    );
};

export default Home;
