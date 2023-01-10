import React from "react"
import styled from "styled-components"
import { ButtonCheck } from "./Button"

export const TodoDemo = ({ todo, handleDelete }) => {
	return (
		<Container>
			<ButtonCheck onClick={handleDelete} />
			<Text completed={todo.isCompleted}>{todo.text}</Text>
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
	text-decoration: ${(props) => (props.completed ? "line-through" : null)};
	text-align: left;
`
