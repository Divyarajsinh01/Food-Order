import React, { useContext } from 'react'
import { currencyFormatter } from '../util/formatter'
import Button from './UI/Button'
import CartContext from './store/CartContext'


export default function MealItem({ meal }) {

    const cartcxt = useContext(CartContext)

    function handleAddMealCart (){
        cartcxt.addItem(meal)
    }

    return (
        <li className='meal-item'>
            <article>
                <img src={`http://localhost:3001/${meal.image}`} alt="" />

                <div>
                    <h3>{meal.name}</h3>
                    <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
                    <p className='meal-item-description'>{meal.description}</p>
                </div>
                <p className='meal-item-actions'>
                    <Button onClick={handleAddMealCart}>Add To Cart</Button>
                </p>
            </article>
        </li>
    )
}
