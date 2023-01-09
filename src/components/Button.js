import React from "react"
import styled from "styled-components"
import { UilCheck } from "@iconscout/react-unicons"

export const ButtonNav = (props) => {
	return (
		<NavButton
			h={props.h}
			w={props.w}
			m={props.m}
			bc={props.bc}
			onClick={props.onClick}
		>
			{props.text}
		</NavButton>
	)
}

export const ButtonCheck = (props) => {
	return (
		<CheckButton onClick={props.onClick}>
			<UilCheck />
		</CheckButton>
	)
}

const NavButton = styled.button`
	width: ${(props) => (props.w ? props.w : "120px")};
	height: ${(props) => (props.h ? props.h : "45px")};
	background-color: ${(props) => (props.bc ? props.bc : "transparent")};
	border-radius: 0px;
	box-shadow: none;
	border: solid;
	color: black;
	font-size: 14px;
	margin: ${(props) => (props.m ? props.m : "0 0 0 0")};
`
const CheckButton = styled.button`
	padding: 3px;
	background-color: transparent;
	border-radius: 0px;
	box-shadow: none;
	border: solid;
	color: black;
	font-size: 14px;
	margin: ${(props) => (props.m ? props.m : "0 0 0 0")};
`
