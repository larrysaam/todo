import './App.css';
import Header from './components/Header'
import Form from './components/Form';
import TodoList from '../src/components/Todolist'
import { useState, useEffect, useRef } from 'react';
import useFetchTasks from './hooks/useFetchTasks'
import  deleteTask  from './utils/deleteTask';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [task, setTask] = useState([])
  const [edit, setEdit] = useState(null)
  const [completedTasks, setCompletedTasks] = useState([])
  const url = 'http://localhost:8000/api/tasks/'
  const {response, error, loading} = useFetchTasks(url)


  useEffect(()=>{

    setTask(response.data)
    console.log(task)
  },[response, edit])


  //filter by removing a task
  const filterTask = (id)=>{
    const filter = task.filter(f => f._id !== id)
    return filter
  }
  

  //delete task with id
  const handleDelete = async(id)=>{
    try {
        await axios.delete(url+ id,
        {headers:{ "Content-Type": "application/json"}}) 
        toast.success("Task deleted successfuly") 
        const newtasks = filterTask(id)
        setTask(newtasks)      
    } catch (error) {
        console.log("Task Delete error:  ",error)
    }
  }


  //task completes
  const handleTaskCompletion = async(task)=>{
      await axios.patch(url + task._id,
        {taskname: task.taskname, completed: true},
        {headers:{ "Content-Type": "application/json"}})
        .then(res=>{
            toast.success(task.taskname + " completed")
        })
        .catch(err=>{
          console.log("completion error: ",err)
        })
  }


  return (
    <div className='taskBox'>
        <Header/>
        <Form task={task} setTask={setTask} edit={edit} setEdit={setEdit}/>
        {/* {task &&
            <div className='task_detail_div'>
            <h4>Total Task :  {task.length}</h4>
            <h5>Completed : {completedTasks.length}</h5>
          </div>
        } */}
        <hr/>
        {error && <p>An error occured : {error.message}</p>}
        {loading && <p>Task Loading...</p>}
        {response &&  <TodoList task={task} setEdit={setEdit} handleTaskCompletion={handleTaskCompletion} handleDelete={handleDelete}/> }
        <ToastContainer/>
    </div>
  );
}

export default App;
