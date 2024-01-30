import {useState, useEffect} from 'react'
import axios from "axios";

const FetchTask = (url)=>{
    const [response, setResponse] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getTask()
    },[])

    const getTask = async()=>{
        setLoading(true)
        await axios.get(url)
        .then((res)=>{
            setResponse(res.data)
        })
        .catch((err)=>{
            setError(err)
        })
        setLoading(false)
    }

    return{ response, error, loading}
}

export default FetchTask