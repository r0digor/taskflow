import { useEffect, useState } from 'react'

function App() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/tasks')
            .then(res => res.json())
            .then(data => {
                setTasks(data)
            })
            .catch(err => {
                console.error('Error fetching tasks:', err)
            })
    }, [])

    function addTask() {
        if (newTask.trim() === '') return

        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTask })
        })
            .then(res => res.json())
            .then(createdTask => {
                setTasks([...tasks, createdTask])
                setNewTask('')
            })
            .catch(err => {
                console.error('Error creating task:', err)
            })
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
