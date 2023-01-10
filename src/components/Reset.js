import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { auth, sendPasswordReset } from "../firebase"
import { Input } from "./Input"

const Reset = () => {
	const [email, setEmail] = useState("")
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()
	useEffect(() => {
		if (loading) return
		if (user) navigate("/")
	}, [user, loading])
	return (
		<Container>
			<Input placeholder="Email Address" onChange={(e) => setEmail(e)} />
			<Submit onClick={() => sendPasswordReset(email)}>
				Send Reset Email
			</Submit>
			<Link to={"/login"}>
				<Text>Don't have an Account?</Text>
			</Link>
			<Link to={"/"}>
				<Text>Home</Text>
			</Link>
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
const Submit = styled.button`
	padding: 2% 5% 2% 5%;
	margin-top: 5%;
	cursor: pointer;
`
const Text = styled.span`
	font-size: 16px;
	color: white;
`
