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
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loading) return
		if (user) navigate("/")
	}, [user, loading])
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
						onChange={(e) => setEmail(e)}
						mb={"5%"}
						width={"100%"}
					/>
					<Input
						type={"password"}
						placeholder="Password"
						mb={"5%"}
						width={"100%"}
						onChange={(e) => setPassword(e)}
					/>
					<div
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							alignItems: "flex-end",
						}}
					>
						<Text style={{ textAlign: "right" }}>
							<Link to={"/reset"} style={{ color: "black" }}>
								Forgot Password?
							</Link>
						</Text>
					</div>

					<Button
						w={"100%"}
						text={"Sign In"}
						m={"7% 0 0 0"}
						onClick={() =>
							logInWithEmailAndPassword(email, password)
						}
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
