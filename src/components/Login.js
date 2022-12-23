import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { ColorRing } from "react-loader-spinner"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [secure, setSecure] = useState(true)
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	const handleSubmit = () => {
		console.log("Regular submission button clicked")
	}

	const handleGoogleSubmit = () => {
		console.log("Google Sign In submission button clicked")
	}

	useEffect(() => {
		if (user) navigate("/dashboard")
	}, [user, loading])
	return (
		<div>
			{loading && (
				<ColorRing
					visible={true}
					height={80}
					width={80}
					colors={["#000000"]}
				/>
			)}
			{!loading && (
				<Container>
					<Email placeholder="Email Address" />
					<Password type={"password"} placeholder="Password" />
					<Submit onClick={handleSubmit}>Submit</Submit>
					<Google onClick={handleGoogleSubmit}>
						Sign in with Google
					</Google>
				</Container>
			)}
		</div>
	)
}

export default Login

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Email = styled.input`
	border-radius: 8px;
	text-align: left;
	height: 48px;
	width: 300px;
	font-size: 17px;
	padding-left: 16px;
	margin-bottom: 5%;
`
const Password = styled.input`
	border-radius: 8px;
	text-align: left;
	height: 48px;
	width: 300px;
	font-size: 17px;
	padding-left: 16px;
`
const Submit = styled.button`
	padding: 2% 5% 2% 5%;
	margin-top: 5%;
`
const Google = styled.button`
	padding: 2% 5% 2% 5%;
	margin-top: 5%;
`
