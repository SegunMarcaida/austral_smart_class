import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TabsComponent from './components/TabsComponent.jsx';
import Home from "./Home.jsx";
import NavBar from "./components/common/NavBar.jsx";
import './App.css';


const App = () => {
    return (
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:id" element={<TabsComponent />} />
                </Routes>
            </Router>

    );
};

export default App;