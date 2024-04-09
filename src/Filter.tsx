import React from 'react';
import "./App.css";
interface FilterProps {
  filterTasks: (status: 'all' | 'active' | 'completed') => void;
}

const Filter: React.FC<FilterProps> = ({ filterTasks }) => {
  const handleFilterChange = (status: 'all' | 'active' | 'completed') => {
    filterTasks(status);
  };

  return (
    <div > <center>
      <button onClick={() => handleFilterChange('all')}>All</button>

      <button onClick={() => handleFilterChange('active')}>Active</button>

      <button onClick={() => handleFilterChange('completed')}>Completed</button>

    </center> </div>
  );
};

export default Filter;