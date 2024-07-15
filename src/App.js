import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './components/TaskItem';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/tasks');
            setTasks(response.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    const addTask = async () => {
        try {
            const response = await axios.post('http://localhost:8000/tasks', { todo: newTask });
            setTasks([...tasks, response.data]);
            setNewTask('');
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            const response = await axios.put(`http://localhost:8000/tasks/${id}`, updatedTask);
            setTasks(tasks.map(task => (task._id === id ? response.data : task)));
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    return (
        <div className="app">
            <h1>My Todo List</h1>
            <div className="add-task-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter new task"
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            {tasks.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    );
};

export default App;
