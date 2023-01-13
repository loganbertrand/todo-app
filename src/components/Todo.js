import React from "react"
import styled from "styled-components"
import { ButtonCheck } from "./Button"

export const TodoDemo = ({ todo, handleDelete, completed }) => {
	return (
		<Container>
			<ButtonCheck onClick={handleDelete} completed={completed} />
			<Text>{todo.text}</Text>
		</Container>
	)
}

const Todo = ({ todo, handleDelete }) => {
	return (
		<Container>
			<ButtonCheck onClick={handleDelete} />
			<Text>{todo.todoValue}</Text>
		</Container>
	)
}

export default Todo

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 0.5rem;
`

const Text = styled.p`
	text-align: left;
`
