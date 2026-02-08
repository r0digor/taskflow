import { useState } from 'react'

function App() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')

    function addTask() {
        if (newTask.trim() === '') return

        setTasks([
            ...tasks,
            { id: Date.now(), title: newTask, completed: false }
        ])

        setNewTask('')
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>TaskFlow</h1>

            <input
                type="text"
                placeholder="Digite uma tarefa"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />

            <button onClick={addTask}>Adicionar</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
