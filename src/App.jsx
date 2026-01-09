import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim()
      }
      setTasks([...tasks, newTask])
      setInputValue('') // Clear the field upon successful addition
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  // Sort tasks in ascending order (alphabetically)
  const sortedTasks = [...tasks].sort((a, b) => a.text.localeCompare(b.text))

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0 text-center">
                <i className="bi bi-check2-square me-2"></i>
                Todo List App
              </h2>
            </div>
            <div className="card-body">
              {/* Add Task Section */}
              <div className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new task..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    id="taskInput"
                  />
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={addTask}
                    id="addButton"
                  >
                    <i className="bi bi-plus-lg me-1"></i>
                    Add Task
                  </button>
                </div>
              </div>

              {/* Tasks List */}
              <div className="todo-list">
                {sortedTasks.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="bi  fs-1 d-block mb-2"></i>
                    <p className="mb-0">No tasks yet. Add one above!</p>
                  </div>
                ) : (
                  <ul className="list-group">
                    {sortedTasks.map((task) => (
                      <li
                        key={task.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span className="task-text">{task.text}</span>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTask(task.id)}
                          data-task-id={task.id}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Task Counter */}
              {tasks.length > 0 && (
                <div className="mt-3 text-center">
                  <small className="text-muted">
                    Total tasks: {tasks.length}
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
