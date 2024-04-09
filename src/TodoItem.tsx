// TodoItem.tsx

import React from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TodoItemProps {
  task: Task;

  toggleCompletion: (id: number) => void;

  deleteTask: (id: number) => void; 

}

const TodoItem: React.FC<TodoItemProps> = ({ task, toggleCompletion, deleteTask }) => {
  const handleToggleCompletion = () => {

    toggleCompletion(task.id);

  };

  const handleDeleteTask = () => {

    deleteTask(task.id);

  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input

        type="checkbox"
        checked={task.completed}

        onChange={handleToggleCompletion}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>

        {task.title} - {task.description}
      </span>
      {task.completed && (
        
         <button onClick={handleDeleteTask}>Delete</button>
        
      )}
    </div>
  );
};

export default TodoItem;
