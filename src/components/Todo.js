import React from "react"
import styled from "styled-components"

export const TodoDemo = ({ todo, handleComplete, handleDelete }) => {
	return (
		<Container>
			<CompleteButton onClick={handleComplete}>Complete</CompleteButton>
			<DeleteButton onClick={handleDelete}>X</DeleteButton>
			<Text completed={todo.isCompleted}>{todo.text}</Text>
		</Container>
	)
}

const Todo = ({ todo, handleComplete, handleDelete }) => {
	return (
		<Container>
			<DeleteButton onClick={handleDelete}>X</DeleteButton>
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

const CompleteButton = styled.button`
	height: 20px;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const DeleteButton = styled.button`
	height: 20px;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
`
