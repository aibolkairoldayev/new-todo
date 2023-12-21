import React from 'react';

import Input from './app/components/Input';
import TodoList from './app/components/TodoList';
import Count from './app/components/Count';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="App__title">Список задач</div>
      <Count />
      <Input />
      <TodoList />
    </div>
  );
}

export default App;
