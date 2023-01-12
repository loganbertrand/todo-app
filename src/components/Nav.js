import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { UilBars } from "@iconscout/react-unicons"

import { logout } from "../firebase"
import { Button } from "./Button"

export const Nav = (props) => {
	const [windowDimension, setWindowDimension] = useState(null)
	const [navOpen, setNavOpen] = useState(false)

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
		<>
			{windowDimension >= 1024 && (
				<Container>
					<Link to={"/"} style={{ textDecoration: "none" }}>
						<Button text="Home" />
					</Link>
					{props.user && (
						<UserWrapper>
							<Text style={{ paddingRight: "3%" }}>
								{props.user.displayName}
							</Text>
							<Button
								onClick={logout}
								text="Sign Out"
								m={"0 0 0 3%"}
							/>
						</UserWrapper>
					)}
					{!props.user && (
						<UserWrapper>
							<Link
								to={"/login"}
								style={{ textDecoration: "none" }}
							>
								<Button text="Sign In" />
							</Link>
							<Link
								to={"/register"}
								style={{ textDecoration: "none" }}
							>
								<Button
									text="Sign Up"
									m={"0 0 0 5%"}
									bc={"black"}
									c={"white"}
								/>
							</Link>
						</UserWrapper>
					)}
				</Container>
			)}
			{windowDimension <= 1023 && (
				<>
					{!navOpen && (
						<NavButtonContainer>
							<NavButton
								onClick={() => {
									setNavOpen(true)
								}}
							>
								<UilBars style={{ color: "white" }} />
							</NavButton>
						</NavButtonContainer>
					)}

					<Wrapper
						style={navOpen ? { width: "300px" } : { width: "0px" }}
					>
						<CloseButton
							onClick={() => {
								setNavOpen(false)
							}}
						>
							&times;
						</CloseButton>
						<Link
							onClick={() => setNavOpen(false)}
							to={"/"}
							style={{ textDecoration: "none" }}
						>
							<NavText>Home</NavText>
						</Link>
						{props.user && (
							<MenuWrapper>
								<NavText>{props.user.displayName}</NavText>
								<NavText
									onClick={() => {
										setNavOpen(false)
										logout()
									}}
								>
									Sign Out
								</NavText>
							</MenuWrapper>
						)}
						{!props.user && (
							<MenuWrapper>
								<Link
									onClick={() => setNavOpen(false)}
									to={"/login"}
									style={{ textDecoration: "none" }}
								>
									<NavText>Sign In</NavText>
								</Link>
								<Link
									onClick={() => setNavOpen(false)}
									to={"/register"}
									style={{ textDecoration: "none" }}
								>
									<NavText>Sign Up</NavText>
								</Link>
							</MenuWrapper>
						)}
					</Wrapper>
				</>
			)}
		</>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 96%;
	padding-top: 1%;
	margin-bottom: 3%;
`
const Text = styled.h5`
	padding: 0;
	margin: 0;
	color: black;
`
const UserWrapper = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	width: 20%;
`
const Wrapper = styled.div`
	height: 100%;
	position: fixed;
	z-index: 1222;
	top: 0;
	right: 0;
	background-color: #111;
	overflow-x: hidden;
	padding-top: 60px;
	transition: 0.5s;
	white-space: nowrap;
`
const MenuWrapper = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
`
const NavButton = styled.div`
	width: 50px;
	height: 50px;
	border: solid black;
	text-align: center;
	color: black;
	background-color: black;
	box-shadow: 0px 3px 7px rgba(67, 68, 68, 0.4);
	font-size: 16px;
	font-weight: 700;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10000;
`
const NavButtonContainer = styled.span`
	display: block;
	top: 20px;
	right: 20px;
	position: fixed;
	z-index: 1;
`
const CloseButton = styled.span`
	position: absolute;
	top: 0;
	right: 25px;
	font-size: 36px;
	margin-left: 50px;
	color: white;
`
const NavText = styled.h5`
	padding: 0;
	margin: 0;
	color: white;
`
