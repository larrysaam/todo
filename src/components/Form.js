import React from "react";
import './style.css'
import { useState, useEffect } from "react";

const Form =({task, setTask, edit, setEdit})=>{

    const [taskname, setTaskname] = useState('')
    const [id, setId] = useState()

    useEffect(()=>{
        setId(0)
        if(edit){
            setTaskname(edit[0].taskname)
            console.log("edit input "+ edit[0].taskname)
        }else{

        }
    },[edit, setTaskname])


    //handle input changes
    const handleOnchange = (event) =>{
        console.log(event.target.value)
        setTaskname(event.target.value)
    }

    //update selected todo
    const updatetodo = (id, taskname)=>{
        const newtask = task.map((todo)=>
            todo.id === id ? {id, taskname} : todo
        )
        setTask(newtask)
        setEdit('')
        setTaskname('')
    }


    //handle form submission
    const submitForm = (event)=>{
        event.preventDefault()
        if(edit){
            updatetodo(edit[0].id, taskname)
        }else{
            if(!taskname){
                alert('Please input a Task first')
            }else{
                setId(id + 1)
                setTask([...task, {"id": taskname, "taskname": taskname}])
                console.log("Taskname : ----" + task)
            }
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
                <button id="submitbtn" type="submit">{edit ? "Ok" : "Add"}</button>
            </form>
        </div>
    );
}

export default Form