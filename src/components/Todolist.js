import React from "react";
import './style.css'
import { useEffect } from "react";
// import useFetchTasks from './hooks/useFetchTasks'

const Todolist =({task, setEdit})=>{

    // const url = "localhost:/8000/api/tasks"
    // const {response, error, loading} = useFetchTasks(url)
    
    useEffect(()=>{
        console.log("----___---"+task)
      })

    
    //handle edite button
    const handleEdit =(id)=>{
        const findtodo = task.filter(todo => todo.id === id)
        setEdit(findtodo)
        console.log("edit_____" + findtodo)
    }


    return(
        <>
            {/* {error && <p>An Error just occured</p>}
            {loading && <p>Loading...</p>}
            {response && todo} */}

            <>

                {task.length === 0 && <p id="emptymsg">Empty</p>}
                { task && task.map((list, index) =>{
                    return (
                        <div className="todoli" key={index} >
                            <input type="text" value={list.taskname} className="list"/>
                            <button id="donebtn">d</button>
                            <button id="editbtn" onClick={()=>handleEdit(list.id)}>e</button>
                            <button id="deletebtn">r</button>
                        </div>
                    )
                }
                )}
            </>
        </>
    );
}

export default Todolist