import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { logout } from "../firebase"
import { ButtonNav } from "./Button"

export const Nav = (props) => {
	return (
		<Container>
			<Link to={"/"} style={{ textDecoration: "none" }}>
				<Text>Home</Text>
			</Link>
			{props.user && (
				<UserWrapper>
					<Text style={{ paddingRight: "3%" }}>
						{props.user.displayName}
					</Text>
					<ButtonNav
						onClick={logout}
						text="Sign Out"
						m={"0 0 0 3%"}
					/>
				</UserWrapper>
			)}
			{!props.user && (
				<Link to={"/login"} style={{ textDecoration: "none" }}>
					<Text>Login/Sign-Up</Text>
				</Link>
			)}
		</Container>
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
	flex-direaction: row;
	justify-content: flex-end;
	align-items: center;
	width: 20%;
`
