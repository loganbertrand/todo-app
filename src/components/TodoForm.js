import React from "react"
import styled from "styled-components"
import { Input } from "./Input"

const TodoForm = ({ value, onChange, onSubmit }) => {
	return (
		<FormContainer onSubmit={onSubmit}>
			<Input
				type={"text"}
				value={value}
				onChange={onChange}
				width="100%"
				placeholder="Enter Task Here"
			/>
		</FormContainer>
	)
}

export default TodoForm

const FormContainer = styled.form`
	@media (min-width: 1024px) {
		width: 55%;
	}
	@media (max-width: 1023px) {
		width: 75%;
	}
`
