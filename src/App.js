import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"

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
			<Wrapper>
				<Router>
					<Nav user={user} />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/reset" element={<Reset />} />
					</Routes>
				</Router>
			</Wrapper>
			<Footer />
		</div>
	)
}

export default App

const Wrapper = styled.header`
	background-color: whitesmoke;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	font-size: calc(10px + 2vmin);
	color: black;
	max-width: "90%";
`
