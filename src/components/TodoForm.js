import React from "react"
import { Input } from "./Input"

const TodoForm = ({ value, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
			<Input type={"text"} value={value} onChange={onChange} />
		</form>
	)
}

export default TodoForm
