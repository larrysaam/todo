import {useState, useEffect} from 'react'

const FetchTask = (url)=>{
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getTask()
    })

    const getTask = async()=>{
        setLoading(true)
        try {
            const tasks = await fetch(url)
            setResponse(tasks)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return{ response, error, loading}
}

export default FetchTask