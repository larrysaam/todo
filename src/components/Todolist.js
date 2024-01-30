import React from "react";
import './style.css'
import {FaCheckDouble, FaEdit, FaRegTrashAlt} from 'react-icons/fa'
import { useEffect, useState } from "react";


const Todolist =({ task, setEdit, handleDelete, handleTaskCompletion})=>{

    useEffect(()=>{
        console.log(task)
    },[task])

    
    //handle edite button
    const handleEdit =(editTask)=>{
        setEdit(editTask)
        console.log( editTask)
    }
    

    return(
        <>
          <>

            {task && 
            task.map((list, index) =>{
                return (
                    <div className={(!task.completed)? "todoli" : "done_todoli"} key={index} >
                        <input type="text" value={list.taskname} className="list"/>
                        <FaCheckDouble id="donebtn" onClick={()=>handleTaskCompletion(list)}/>
                        <FaEdit id="editbtn" onClick={()=>{handleEdit(list)}}/>
                        <FaRegTrashAlt id="deletebtn" onClick={()=>handleDelete(list._id)}/>
                    </div>
                )
            }
            )}
            </>
        </>
    );
}

export default Todolist