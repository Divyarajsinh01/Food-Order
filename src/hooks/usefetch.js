import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"

async function fetchHttpRequest (url, config){
    const res = await fetch(url, config)

    const resData = await res.json()

    if(!res.ok){
        throw new Error(resData.message || 'Somethings went wrong!')
    }

    return resData
}

export default function useFetch(url, config, intialValue){

    const [data, setdata] = useState(intialValue)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const clearData = () => {
        setdata(intialValue)
    }

    const sendRequest = useCallback(async function sendRequest(data){
        setLoading(true)
        try {
            const resData = await fetchHttpRequest(url, {...config, body: data})
            setdata(resData)
        } catch (error) {
            setError(error.message || 'somethings went wrong!')
        }
        setLoading(false)
    },[url, config])

    useEffect(() => {
        if((config && (config.method === 'GET' || !config.method) || !config)){
            sendRequest()
        }
    }, [sendRequest, config])

    return {
        data,
        error,
        loading,
        sendRequest,
        clearData
    }
}