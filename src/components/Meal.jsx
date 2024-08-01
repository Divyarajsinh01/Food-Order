import React, { useEffect, useState } from 'react'
import MealItem from './MealItem'
import useFetch from '../hooks/usefetch'
import Error from './Error'

const requestConfig = {}

export default function Meal() {

    // const [loadMeals, setLoadMeals] = useState([])

    const {data: loadMeals, error, loading} = useFetch('http://localhost:3000/meals', requestConfig, [])

    if(loading){
        return <p className='center'>loading......</p>
    }

    if(error){
        return <Error title="Failed to fetch meals" message={error} />
    }
    // useEffect(()=>{
    //     async function fetchMeals(){
    //         try {
    //             const res = await fetch('http://localhost:3000/meals')

    //             if(!res.ok){
    //                 // ...
    //             }
    //             const meals = await res.json()

    //             setLoadMeals(meals)
    //         } catch (error) {
    //             // ...
    //         }
    //     }
    //     fetchMeals()
    // },[])

  return (
    <ul id='meals'>
        {loadMeals.map((meal) => (
            <MealItem key={meal.id} meal={meal}/>
        ))}
    </ul>
  )
}
