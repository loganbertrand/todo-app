import React from "react"
import { InputTask } from "./Input"

const TodoForm = ({ value, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
			<InputTask type={"text"} value={value} onChange={onChange} />
		</form>
	)
}

export default TodoForm
