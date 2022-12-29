import React from "react"
import styled from "styled-components"

const Input = (props) => {
	return (
		<InputContainer
			type={props.type}
			placeholder={props.placeholder}
			onChange={props.onChange}
			mb={props.mb}
		/>
	)
}

export default Input

const InputContainer = styled.input`
	border-radius: 8px;
	text-align: left;
	height: 48px;
	width: 300px;
	font-size: 17px;
	padding-left: 16px;
	margin-bottom: ${(props) => (props.mb ? props.mb : null)};
`
