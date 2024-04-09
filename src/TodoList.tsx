import React, { useState, useEffect } from 'react';
import './App.css'
import TodoItem from './TodoItem';
import Filter from './Filter';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskTitle.trim()) return; // Don't add empty task
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const toggleCompletion = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filterTasks = (status: 'all' | 'active' | 'completed') => {
    setFilter(status);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedTasksExist = tasks.some(task => task.completed);

  return (
    <div className="container">

      <h1>Todo List</h1>

      <div className="todo-form">
        <input
          type="text"
          placeholder="Add new task"

          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description (optional)"

          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <div className="todo-list">
        {filteredTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}

            toggleCompletion={toggleCompletion}
            deleteTask={deleteTask}
          />
        ))}

      </div>
      <Filter filterTasks={filterTasks} />
      {completedTasksExist && (
        
        <button onClick={deleteCompletedTasks}>Delete Completed Tasks</button>
      )}

    </div>
  );
};

export default TodoList;
