import { useState } from "react"

export function NewTodoForm(props) {
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e) {
        // prevent page from refreshing
        e.preventDefault()
        // return nothing if no item is passed in
        if (newItem === "") return

        // pass new list item to todo list
        props.addTodo(newItem)

        // clear input bar
        setNewItem("")
      }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"></input>
        </div>
        <button className="btn">Add</button>
      </form>
    )
}