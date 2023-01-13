import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"

import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase"

import { Input } from "./Input"
import { Button } from "./Button"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [user, loading] = useAuthState(auth)
	const [windowDimension, setWindowDimension] = useState(null)

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
	const navigate = useNavigate()

	const signIn = (email, password) => {
		logInWithEmailAndPassword(email, password)
	}

	useEffect(() => {
		if (loading) return
		if (user) navigate("/")
	}, [user, loading, navigate])
	return (
		<Container
			style={windowDimension > 400 ? { width: 350 } : { width: 300 }}
		>
			<Title>Sign In</Title>
			<Button w={"100%"} m={"0 0 5% 0"} onClick={signInWithGoogle} />
			<Or>or</Or>
			<Input
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
				mb={"5%"}
				width={"100%"}
				value={email}
			/>
			<Input
				type={"password"}
				placeholder="Password"
				mb={"5%"}
				width={"100%"}
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<ForgotWrapper>
				<Text style={{ textAlign: "right" }}>
					<Link to={"/reset"} style={{ color: "black" }}>
						Forgot Password?
					</Link>
				</Text>
			</ForgotWrapper>

			<Button
				w={"100%"}
				text={"Sign In"}
				m={"7% 0 0 0"}
				onClick={() => signIn(email, password)}
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

export default Login

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 350px;
`
const Text = styled.span`
	font-size: 12px;
	color: black;
`
const Title = styled.h1``

const Or = styled.h5`
	font-size: 12px;
`
const ForgotWrapper = styled.div`
	flex-direction: "row";
	justify-content: "flex-end";
	align-items: "flex-end";
`
