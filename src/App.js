import { useState, useEffect } from "react"
import styled from "styled-components"

import "./App.css"
import Todo from "./components/Todo"
import TodoForm from "./components/TodoForm"

function App() {
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
		<div className="App">
			<header className="App-header">
				<p>Todo App Project</p>
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
			</header>
		</div>
	)
}

export default App

const TodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`
