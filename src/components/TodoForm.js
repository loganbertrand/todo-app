import React from "react"
import styled from "styled-components"

const TodoForm = ({ value, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
			<input type={"text"} value={value} onChange={onChange} />
		</form>
	)
}

export default TodoForm
