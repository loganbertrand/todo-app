import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { ColorRing } from "react-loader-spinner"

import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase"
import { Nav } from "./Nav"
import { Input } from "./Input"
import { Button } from "./Button"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [user, loading] = useAuthState(auth)
	const navigate = useNavigate()

	const signIn = (email, password) => {
		logInWithEmailAndPassword(email, password)
	}

	useEffect(() => {
		if (loading) return
		if (user) navigate("/")
	}, [user, loading, navigate])
	return (
		<>
			<Nav />
			<Title>Sign In</Title>
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
					<Button
						w={"100%"}
						m={"0 0 5% 0"}
						onClick={signInWithGoogle}
					/>
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
			)}
		</>
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
const ErrorText = styled.p`
	font-size: 12px;
	color: red;
`
