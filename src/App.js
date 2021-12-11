import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //State staff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  
  //Run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, [])
  //Use Effect
  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case 'completed':
          setFilteredTodos(todos.filter((todo) => todo.completed));
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter((todo) => !todo.completed));
          break;
        default: setFilteredTodos(todos);
          break;
      }
    }
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //Save to local
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  const getLocalTodos = () => {
    if(!localStorage.getItem('todos')){
      localStorage.setItem('todos', JSON.stringify([]));
    }
      const storage = JSON.parse(localStorage.getItem('todos'));
      setTodos(storage);
  }


  return (
    <div className="App">
      <header>
        <h1>Tamir's Todo List</h1>
      </header>
      <Form filteredTodos={filteredTodos} setStatus={setStatus} todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} />
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
