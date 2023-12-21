import React from 'react';

import Input from './app/components/Input';
import TodoList from './app/components/TodoList';
import Count from './app/components/Count';
import './App.css';

function App() {
  return (
    <div className="App">
      <Count />
      <Input />
      <TodoList />
    </div>
  );
}

export default App;
