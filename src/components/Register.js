import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, useNavigate } from "react-router-dom"
import {
	auth,
	registerWithEmailAndPassword,
	signInWithGoogle,
} from "../firebase"
import Input from "./Input"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()
	const register = () => {
		if (!name) alert("Please enter name")
		registerWithEmailAndPassword(name, email, password)
	}
	useEffect(() => {
		if (loading) return
		if (user) navigate("/")
	}, [user, loading])

	return (
		<Container>
			<Input
				placeholder="Full Name"
				onChange={(e) => setName(e)}
				mb="5%"
			/>
			<Input
				placeholder="Email Address"
				onChange={(e) => setEmail(e)}
				mb="5%"
			/>
			<Input
				type={"password"}
				placeholder="Password"
				onChange={(e) => setPassword(e)}
				mb="5%"
			/>
			<Submit onClick={register}>Submit</Submit>
			<Google onClick={signInWithGoogle}>Register with Google</Google>
			<Link to={"/login"}>
				<Text>Already have an Account?</Text>
			</Link>
			<Link to={"/"}>
				<Text>Home</Text>
			</Link>
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
const Submit = styled.button`
	padding: 2% 5% 2% 5%;
	margin-top: 5%;
	cursor: pointer;
`
const Google = styled.button`
	padding: 2% 5% 2% 5%;
	margin-top: 5%;
	cursor: pointer;
`

const Text = styled.span`
	font-size: 16px;
	color: white;
`
