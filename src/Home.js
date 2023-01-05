import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth"

import Todo from "./components/Todo"
import TodoForm from "./components/TodoForm"
import { auth, logout, grabTodos, postTodo } from "./firebase"

const Home = () => {
	const navigate = useNavigate()

	const [user, loading] = useAuthState(auth)
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

	const addTodo = async (text) => {
		if (!loading) {
			if (user) {
				console.log("insert firebase stuff")
				postTodo(user.uid, text)
			} else {
				const newTodos = [...todos, { text }]
				setTodos(newTodos)
			}
		}
	}

	const completeTodo = async (index) => {
		const newTodos = [...todos]
		newTodos[index].isCompleted = true
		setTodos(newTodos)
	}

	const deleteTodo = async (index) => {
		const newTodos = [...todos]
		newTodos.splice(index, 1)
		setTodos(newTodos)
	}

	useEffect(() => {
		if (loading) return
		if (user) {
			grabTodos(user.uid)
		}
	}, [user, loading])
	return (
		<div>
			<TodoForm
				onSubmit={handleSubmit}
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>

			{!user && !loading && (
				<>
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
					<Nudge
						onClick={() => {
							navigate("/login")
						}}
					>
						Login
					</Nudge>
				</>
			)}
			{user && !loading && (
				<>
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
					<Nudge
						onClick={() => {
							logout()
						}}
					>
						Logout
					</Nudge>
					<br />
					<Nudge>{user.displayName}</Nudge>
				</>
			)}
		</div>
	)
}

export default Home

const TodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`
const Nudge = styled.span`
	font-size: 16px;
	cursor: pointer;
`
