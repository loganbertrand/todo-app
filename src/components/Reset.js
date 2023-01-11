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
	const navigate = useNavigate()
	useEffect(() => {
		if (loading) return
		if (user) navigate("/")
	}, [user, loading, navigate])
	return (
		<Container>
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
	width: 350px;
`
const Text = styled.span`
	font-size: 16px;
	color: black;
`
const Title = styled.h1``
