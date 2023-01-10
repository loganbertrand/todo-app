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
import { Nav } from "./Nav"
import { Button } from "./Button"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [name, setName] = useState("")
	const [user, loading] = useAuthState(auth)
	const navigate = useNavigate()
	const register = () => {
		if (!name || confirmPassword !== password || !email) {
			if (!name) {
				alert("Please enter name")
			}
			if (confirmPassword !== password) {
				alert("Please ensure your passwords match")
			}
			if (!email) {
				alert("Please enter email")
			}
		} else {
			registerWithEmailAndPassword(name, email, password)
		}
	}
	useEffect(() => {
		if (loading) return
		if (user) navigate("/")
	}, [user, loading, navigate])

	return (
		<>
			<Nav />
			<Title>Sign Up</Title>
			<Container>
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
				/>
				<Input
					placeholder="Email Address"
					onChange={(e) => setEmail(e.target.value)}
					mb="5%"
					width={"100%"}
					value={email}
				/>
				<Input
					type={"password"}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					mb="5%"
					width={"100%"}
					value={password}
				/>
				<Input
					type={"password"}
					placeholder="Confirm Password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					mb="5%"
					width={"100%"}
					value={confirmPassword}
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
		</>
	)
}

export default Register

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 350px;
`

const Title = styled.h1``

const Text = styled.span`
	font-size: 14px;
	color: white;
`
const Or = styled.h5`
	font-size: 12px;
`
