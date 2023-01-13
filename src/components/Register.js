import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, useNavigate } from "react-router-dom"
import {
	auth,
	registerWithEmailAndPassword,
	signInWithGoogle,
} from "../firebase"
import { Input } from "./Input"

import { Button } from "./Button"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [name, setName] = useState("")
	const [nameError, setNameError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [confirmError, setConfirmError] = useState(false)
	const [user, loading] = useAuthState(auth)
	const navigate = useNavigate()
	const [windowDimension, setWindowDimension] = useState(null)

	const register = () => {
		if (
			!name ||
			confirmPassword !== password ||
			!email ||
			!password ||
			!confirmPassword
		) {
			if (!name) {
				setNameError(true)
			} else if (name) {
				setNameError(false)
			}

			if (!email) {
				setEmailError(true)
			} else if (email) {
				setEmailError(false)
			}
			if (!password) {
				setPasswordError(true)
			} else if (password) {
				setPasswordError(false)
			}
			if (!confirmPassword || confirmPassword !== password) {
				setConfirmError(true)
			} else if (confirmPassword && confirmPassword === password) {
				setConfirmError(false)
			}
			if (confirmPassword !== password) {
				alert("Please ensure your passwords match")
			}
		} else {
			setNameError(false)
			setEmailError(false)
			setPasswordError(false)
			setConfirmError(false)
			registerWithEmailAndPassword(name, email, password)
		}
	}
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
			<Title>Sign Up</Title>
			<Button
				w={"100%"}
				m={"0 0 5% 0"}
				onClick={signInWithGoogle}
				register
			/>

			<Or>or</Or>
			<Input
				placeholder="Full Name"
				onChange={(e) => setName(e.target.value)}
				mb="5%"
				width={"100%"}
				value={name}
				error={nameError}
			/>
			<Input
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
				mb="5%"
				width={"100%"}
				value={email}
				error={emailError}
			/>
			<Input
				type={"password"}
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				mb="5%"
				width={"100%"}
				value={password}
				error={passwordError}
			/>
			<Input
				type={"password"}
				placeholder="Confirm Password"
				onChange={(e) => setConfirmPassword(e.target.value)}
				mb="5%"
				width={"100%"}
				value={confirmPassword}
				error={confirmError}
			/>
			<Button
				w={"100%"}
				text={"Create Account"}
				m={"7% 0 5% 0"}
				onClick={() => register(email, password)}
			/>
			<Text style={{ textAlign: "right" }}>
				<Link to={"/login"} style={{ color: "black" }}>
					Already have an Account?
				</Link>
			</Text>
		</Container>
	)
}

export default Register

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Title = styled.h1``

const Text = styled.span`
	font-size: 14px;
	color: white;
`
const Or = styled.h5`
	font-size: 12px;
`
