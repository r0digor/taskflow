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

    function toggleTask(id, completed) {
        fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !completed })
        })
            .then(res => res.json())
            .then(() => {
                setTasks(tasks.map(task =>
                    task.id === id ? { ...task, completed: !completed } : task
                ))
            })
            .catch(err => {
                console.error('Error updating task:', err)
            })
    }

    function deleteTask(id) {
        fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id))
            })
            .catch(err => {
                console.error('Error deleting task:', err)
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
                    <li key={task.id} style={{ marginBottom: '8px' }}>
                        <label style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            <input
                                type="checkbox"
                                checked={!!task.completed}
                                onChange={() => toggleTask(task.id, task.completed)}
                            />
                            {task.title}
                        </label>

                        <button
                            style={{ marginLeft: '10px' }}
                            onClick={() => deleteTask(task.id)}
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
