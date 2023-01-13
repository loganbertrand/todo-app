import { useState, useEffect, useRef } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import autoAnimate from "@formkit/auto-animate"

import Home from "./Home"
import Login from "./components/Login"
import Reset from "./components/Reset"
import Register from "./components/Register"
import { Footer } from "./components/Footer"
import { Nav } from "./components/Nav"
import { auth } from "./firebase"

function App() {
	const [user] = useAuthState(auth)
	const [windowDimension, setWindowDimension] = useState(null)
	const parent = useRef(null)

	useEffect(() => {
		parent.current && autoAnimate(parent.current)
	}, [parent])

	useEffect(() => {
		setWindowDimension(window.innerWidth)
	}, [])

	useEffect(() => {
		function handleResize() {
			setWindowDimension(window.innerWidth)
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])
	return (
		<Container>
			<Router>
				<Nav user={user} />
				<Wrapper
					ref={parent}
					style={
						windowDimension <= 1023 ? { paddingTop: "12%" } : null
					}
				>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/reset" element={<Reset />} />
					</Routes>
				</Wrapper>
			</Router>

			<Footer />
		</Container>
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
	width: "100%";
`

const Container = styled.div`
	background-color: whitesmoke;
`
