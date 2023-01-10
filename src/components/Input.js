import React from "react"
import styled from "styled-components"

const Input = (props) => {
	return (
		<InputField
			height={props.height}
			width={props.width}
			mb={props.mb}
			type={props.type}
			value={props.value}
			onChange={props.onChange}
			placeholder={props.placeholder}
			error={props.error}
		/>
	)
}

export { Input }

const InputField = styled.input`
	background: transparent;
	border: none;
	border-bottom: ${(props) =>
		props.error ? "1px solid red" : "1px solid #000000"};
	box-shaow: none;
	text-align: left;
	height: ${(props) => (props.height ? props.height : "48px")};
	width: ${(props) => (props.width ? props.width : "300px")};
	font-size: 16px;
	padding-left: 5px;
	margin-bottom: ${(props) => (props.mb ? props.mb : null)};
	&:focus {
		outline: none;
	}
`
