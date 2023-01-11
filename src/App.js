import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"

import "./App.css"
import Home from "./Home"
import Login from "./components/Login"
import Reset from "./components/Reset"
import Register from "./components/Register"
import { Footer } from "./components/Footer"
import { Nav } from "./components/Nav"
import { auth } from "./firebase"

function App() {
	const [user] = useAuthState(auth)
	return (
		<div className="App">
			<header className="App-header">
				<Router>
					<Nav user={user} />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/reset" element={<Reset />} />
					</Routes>
				</Router>
			</header>
			<Footer />
		</div>
	)
}

export default App
