import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, updateTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTodo, setNewTodo] = useState(task.todo);

    const handleUpdate = () => {
        updateTask(task._id, { ...task, todo: newTodo });
        setIsEditing(false);
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button onClick={handleUpdate} className="edit">Save</button>
                </>
            ) : (
                <>
                    <span>{task.todo}</span>
                    <button onClick={() => setIsEditing(true)} className="edit">Edit</button>
                </>
            )}
            <button onClick={() => deleteTask(task._id)} className="delete">Delete</button>
        </div>
    );
};

export default TaskItem;
