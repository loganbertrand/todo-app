import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth"
import { getDocs, collection, where, orderBy } from "firebase/firestore"

import Todo, { TodoDemo } from "./components/Todo"
import TodoForm from "./components/TodoForm"
import { auth, logout, postTodo, db, deleteTodoItem } from "./firebase"

const Home = () => {
	const navigate = useNavigate()

	const [user, loading] = useAuthState(auth)
	const [todosDemo, setTodosDemo] = useState([
		{
			text: "Go to the Grocery Store",
			isCompleted: false,
		},
		{
			text: "Read a Book",
			isCompleted: false,
		},
		{
			text: "Eat a Sandwich",
			isCompleted: false,
		},
	])

	const [todos, setTodos] = useState([])

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
				await postTodo(user.uid, text)
				grabTodos(user.uid)
			} else {
				const newTodos = [...todosDemo, { text }]
				setTodosDemo(newTodos)
			}
		}
	}

	const completeTodoDemo = async (index) => {
		const newTodos = [...todosDemo]
		newTodos[index].isCompleted = true
		setTodosDemo(newTodos)
	}

	const deleteTodo = async (index, todo) => {
		if (!loading) {
			if (user) {
				console.log("Todo Item: ", todo.id)
				await deleteTodoItem(todo.id)
				grabTodos(user.uid)
			} else {
				const newTodos = [...todosDemo]
				newTodos.splice(index, 1)
				setTodosDemo(newTodos)
			}
		}
	}

	const grabTodos = async (user) => {
		const response = await getDocs(
			collection(db, "todos"),
			where("uid", "==", user),
			orderBy("createdAt", "desc")
		)
		let newTodos = []
		response.docs.forEach((doc) => {
			console.log(doc.id)
			newTodos.push({ id: doc.id, data: doc.data() })
		})
		console.log("Todos? ", newTodos)
		setTodos(newTodos.sort((a, b) => b.data.createdAt - a.data.createdAt))
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
						{todosDemo.map((todo, index) => (
							<TodoDemo
								key={index}
								index={index}
								todo={todo}
								handleComplete={() => {
									completeTodoDemo(index)
								}}
								handleDelete={() => {
									deleteTodo(index, todo)
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
								todo={todo.data}
								handleDelete={() => {
									deleteTodo(index, todo)
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
