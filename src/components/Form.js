import React from "react";
import './style.css'
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import axios from 'axios'

const Form =({task, setTask, edit, setEdit})=>{

    let newtask = {}
    const [taskname, setTaskname] = useState('')
    const [input, setInput] = useState({})
    const [newdata, setNewdata] = useState({})
    const [id, setId] = useState(null)

    useEffect(()=>{
        console.log(task)
        if(edit){
            setTaskname(edit.taskname)
            console.log("edit input "+ edit)
        }else{

        }
    },[edit, setTaskname, task])


    //handle input changes
    const handleOnchange = (event) =>{
        setTaskname(event.target.value)
        console.log(taskname)
    }


    //update selected todo
    const updatetodo = async(id)=>{
        // newtask = task.map((todo)=> todo._id === _id ? {_id, id, taskname, completed} : todo )
        try {
            const response = await axios.patch("http://localhost:8000/api/tasks/"+id,
            {taskname: taskname},
            {headers:{ "Content-Type": "application/json"}})
            setEdit(null)
            setTaskname(null)
            toast.success("Edit successful")
            // change task without adding change to settask
        } catch (error) {
            console.log(error)
        }
    }


    //handle form submission
    const submitForm = (event)=>{
        event.preventDefault()
        if(edit){
            updatetodo(edit._id)
        }else{
            if(!taskname){
                toast.error('Please input a Task Name first')
            }else{
                setInput({"taskname": taskname, "completed": false})
                createTask()
            }
        }
    }


    //create new task
    const createTask = async()=>{
        const url = 'http://localhost:8000/api/tasks'

        try {
            await axios.post(url, 
            input,
            {headers:{ "Content-Type": "application/json"}})
            setTask([...task, input])
            toast.success("Task Added Successfully")
        } catch (error) {
            console.log(`task not created because: ${error}`)
        }

    }



    return(
        <div className="form">
            <form onSubmit={submitForm}>
                <input 
                    name="task" 
                    type="text" 
                    id="taskinput" 
                    placeholder="Add Task here " 
                    onChange={handleOnchange} 
                    value={taskname}
                />
                <button id="submitbtn" type="submit">{(edit) ? "Ok" : "Add"}</button>
            </form>
        </div>
    );
}

export default Form