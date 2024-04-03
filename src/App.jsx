import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./newTodoForm"
import { TodoList } from "./todoList"

export default function App() {
  const [todos, setTodos] = useState(() => {
    // check to see if there are any local values for todo list in local storage
    const localValue = localStorage.getItem("ITEMS")
    // if nothing in local storage, return empty list
    if (localValue == null) return []
    // if something in list, return local sotrage todo list
    return JSON.parse(localValue)
  })

  // useEffect is run anytime todos is updated
  useEffect(() => {
    // when item is added/deleted from todos list, add it to local storage
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
      // add a new todo item to todo list
      setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    // search for todo with id that is passed in, then mark as completed
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    //  return a list that excludes the id that is to be deleted
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id )
    })
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header"> Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}