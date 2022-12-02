import { useState, useEffect } from "react"
import styled from "styled-components"

import Todo from "./components/Todo"
import TodoForm from "./components/TodoForm"

const Home = () => {
	const [todos, setTodos] = useState([
		{
			text: "First todo",
			isCompleted: false,
		},
		{
			text: "second todo",
			isCompleted: false,
		},
		{
			text: "third todo",
			isCompleted: false,
		},
	])

	const [value, setValue] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!value) return
		addTodo(value)
		setValue("")
	}

	const addTodo = (text) => {
		const newTodos = [...todos, { text }]
		setTodos(newTodos)
	}

	const completeTodo = (index) => {
		const newTodos = [...todos]
		newTodos[index].isCompleted = true
		setTodos(newTodos)
	}

	const deleteTodo = (index) => {
		const newTodos = [...todos]
		newTodos.splice(index, 1)
		setTodos(newTodos)
	}
	return (
		<div>
			<TodoForm
				onSubmit={handleSubmit}
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>
			<TodoContainer>
				{todos.map((todo, index) => (
					<Todo
						key={index}
						index={index}
						todo={todo}
						handleComplete={() => {
							completeTodo(index)
						}}
						handleDelete={() => {
							deleteTodo(index)
						}}
					/>
				))}
			</TodoContainer>
			<Nudge>Looking to save your tasks? Sign up for an account!</Nudge>
		</div>
	)
}

export default Home

const TodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`
const Nudge = styled.span``
