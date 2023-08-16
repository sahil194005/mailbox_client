import NavBar from "./Components/NavBar";
import Auth from "./Components/Pages/Auth";
import Dashboard from "./Components/Pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import NoMatch from "./Components/Pages/NoMatch";
import AboutUs from "./Components/Pages/AboutUs";
function App() {
	return <div className="App">

		<NavBar/>
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="/home" element={<Dashboard />} />
			<Route path="/aboutUs" element={<AboutUs />} />
			<Route path="*" element={<NoMatch/>}/>
		</Routes>
	</div>;
}

export default App;
