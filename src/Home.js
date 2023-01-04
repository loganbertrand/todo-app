import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { query, collection, getDocs, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

import Todo from "./components/Todo"
import TodoForm from "./components/TodoForm"
import { auth, db, logout } from "./firebase"
import { async } from "@firebase/util"

const Home = () => {
	const navigate = useNavigate()

	const [user, loading, error] = useAuthState(auth)
	const [name, setName] = useState("")
	const [signedIn, setSignedIn] = useState(false)
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

	const getUsername = async () => {
		try {
			const q = query(
				collection(db, "users"),
				where("uid", "==", user?.uid)
			)
			const doc = await getDocs(q)
			const data = doc.docs[0].data()
			setName(data.name)
		} catch (err) {
			console.error(err)
			alert(
				"Error while attempting to grab user data, please try again later"
			)
		}
	}

	useEffect(() => {
		if (loading) return
		if (user) {
			getUsername()
		}
	}, [user, loading])
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
			{!user &&
				!loading(
					<Nudge
						onClick={() => {
							navigate("/login")
						}}
					>
						Login
					</Nudge>
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
