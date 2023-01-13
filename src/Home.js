import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth"
import { getDocs, collection, where, orderBy } from "firebase/firestore"
import autoAnimate from "@formkit/auto-animate"

import Todo, { TodoDemo } from "./components/Todo"
import TodoForm from "./components/TodoForm"

import { auth, postTodo, db, deleteTodoItem } from "./firebase"

const Home = () => {
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
	const parent = useRef(null)

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
		parent.current && autoAnimate(parent.current)
	}, [parent])

	useEffect(() => {
		if (loading) return
		if (user) {
			grabTodos(user.uid)
		}
	}, [user, loading])
	return (
		<>
			<Container>
				<Title>Daily Tasks</Title>
				<TodoForm
					onSubmit={handleSubmit}
					onChange={(e) => setValue(e.target.value)}
					value={value}
				/>
				<TodoContainer ref={parent}>
					{!user && !loading && (
						<>
							{todosDemo.map((todo, index) => (
								<TodoDemo
									key={index}
									index={index}
									todo={todo}
									handleDelete={() => {
										deleteTodo(index, todo)
									}}
								/>
							))}
						</>
					)}
					{user && !loading && (
						<>
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
						</>
					)}
				</TodoContainer>
			</Container>
		</>
	)
}

export default Home

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 3%;
`

const Title = styled.h1``

const TodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin-top: 5%;
	@media (min-width: 1024px) {
		width: 55%;
	}
	@media (max-width: 1023px) {
		width: 75%;
	}
`
