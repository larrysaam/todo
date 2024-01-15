
import './App.css';
import Header from './components/Header'
import Form from './components/Form';
import TodoList from '../src/components/Todolist'
import { useState, useEffect } from 'react';
import useFetchTasks from '../src/hooks/useFetchTasks'

function App() {
  const url = 'localhost:8000/api/tasks'
  const [task, setTask] = useState([])
  const [edit, setEdit] = useState()

  const {response, error, loading} = useFetchTasks(url)

  useEffect(()=>{
    setTask(response)
  },[response])



  return (
    <div className='taskBox'>
        <Header/>
        <Form task={task} setTask={setTask} edit={edit} setEdit={setEdit}/>
        <hr/>
        {error && <p>An error occured</p>}
        {loading && <p>Task Loading</p>}
        {response && <TodoList task={task} setEdit={setEdit}/>}
        
    </div>
  );
}

export default App;
