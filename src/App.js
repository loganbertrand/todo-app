import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import "./App.css"
import Home from "./Home"
import Login from "./components/Login"

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<p>Todo App Project</p>
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
					</Routes>
				</Router>
			</header>
		</div>
	)
}

export default App
