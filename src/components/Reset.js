import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { auth, sendPasswordReset } from "../firebase"
import { Input } from "./Input"
import { Button } from "./Button"

const Reset = () => {
	const [email, setEmail] = useState("")
	const [user, loading] = useAuthState(auth)
	const [windowDimension, setWindowDimension] = useState(null)

	const navigate = useNavigate()

	useEffect(() => {
		if (loading) return
		if (user) navigate("/")
	}, [user, loading, navigate])

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
		<Container
			style={windowDimension > 400 ? { width: 350 } : { width: 300 }}
		>
			<Title>Reset</Title>
			<Input
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
				mb={"5%"}
				width={"100%"}
				value={email}
			/>
			<Button
				w={"100%"}
				text={"Send Reset Email"}
				m={"7% 0 0 0"}
				onClick={() => sendPasswordReset(email)}
			/>

			<Text style={{ marginTop: "2rem" }}>
				Don't have and account?{" "}
				<Link to={"/register"} style={{ color: "black" }}>
					Sign Up
				</Link>
			</Text>
		</Container>
	)
}

export default Reset

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const Text = styled.span`
	font-size: 16px;
	color: black;
`
const Title = styled.h1``
