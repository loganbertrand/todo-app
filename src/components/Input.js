import React from "react"
import styled from "styled-components"

const InputLogin = (props) => {
	return (
		<InputContainer
			type={props.type}
			placeholder={props.placeholder}
			onChange={props.onChange}
			mb={props.mb}
			height={props.height}
			width={props.width}
		/>
	)
}

const InputTask = (props) => {
	return (
		<InputField
			height={props.height}
			width={props.width}
			mb={props.mb}
			type={props.type}
			value={props.value}
			onChange={props.onChange}
		/>
	)
}

export { InputLogin, InputTask }

const InputContainer = styled.input`
	border-radius: 8px;
	text-align: left;
	height: ${(props) => (props.height ? props.height : "48px")};
	width: ${(props) => (props.mb ? props.mb : "300px")};
	font-size: 17px;
	padding-left: 16px;
	margin-bottom: ${(props) => (props.mb ? props.mb : null)};
`
const InputField = styled.input`
	background: transparent;
	border: none;
	border-bottom: 1px solid #000000;
	box-shaow: none;
	text-align: left;
	height: ${(props) => (props.height ? props.height : "48px")};
	width: ${(props) => (props.mb ? props.mb : "300px")};
	font-size: 20px;
	padding-left: 5px;
	margin-bottom: ${(props) => (props.mb ? props.mb : null)};
	&:focus {
		outline: none;
	}
`
