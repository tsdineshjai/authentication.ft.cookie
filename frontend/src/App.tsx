import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Logout from "./components/logout";
import Home from "./components/home";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<Signup />} />
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
