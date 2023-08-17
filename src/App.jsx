import NavBar from "./Components/NavBar";
import Auth from "./Components/Pages/Auth";
import Dashboard from "./Components/Pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import NoMatch from "./Components/Pages/NoMatch";
import AboutUs from "./Components/Pages/AboutUs";
import Compose from "./Components/Pages/Compose";
import Inbox from "./Components/Pages//Inbox/Inbox";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from "react";

function App() {
	return <React.Fragment>
		<ToastContainer />
		<NavBar />
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="/home" element={<Dashboard />} />
			<Route path="/aboutUs" element={<AboutUs />} />
			<Route path="/compose" element={<Compose />} />
			<Route path = "/inbox" element={<Inbox/>}/>
			<Route path="*" element={<NoMatch />} />
		</Routes>

	</React.Fragment>

}

export default App;



