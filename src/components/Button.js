import React from "react"
import styled from "styled-components"
import { UilCheck, UilGoogle } from "@iconscout/react-unicons"

export const Button = (props) => {
	return (
		<ButtonContainer
			h={props.h}
			w={props.w}
			m={props.m}
			bc={props.bc}
			c={props.c}
			onClick={props.onClick}
		>
			{props.text ? (
				props.text
			) : (
				<Wrapper>
					<UilGoogle />
					<h5 style={{ paddingLeft: ".5rem" }}>
						{props.register ? "Register " : "Sign in "} with Google
					</h5>
				</Wrapper>
			)}
		</ButtonContainer>
	)
}

export const ButtonCheck = (props) => {
	return (
		<CheckButton
			onClick={props.onClick}
			completed={props.completed}
			aria-label="Click to complete task from the list"
		>
			<UilCheck />
		</CheckButton>
	)
}

const ButtonContainer = styled.button`
	width: ${(props) => (props.w ? props.w : "120px")};
	height: ${(props) => (props.h ? props.h : "45px")};
	background-color: ${(props) => (props.bc ? props.bc : "transparent")};
	border-radius: 0px;
	box-shadow: none;
	border: solid black;
	color: ${(props) => (props.c ? props.c : "black")};
	font-size: 14px;
	margin: ${(props) => (props.m ? props.m : "0 0 0 0")};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`
const CheckButton = styled.button`
	padding: 2px;
	background-color: transparent;
	border-radius: 0px;
	box-shadow: ${(props) =>
		props.completed ? "inset 100px 0 0 0 #e0e0e0" : "none"};
	border: solid;
	color: ${(props) => (props.completed ? "white" : "black")};
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`
const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`
