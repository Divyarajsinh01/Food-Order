import React, { useContext, useState } from 'react';
import { currencyFormatter } from '../util/formatter';
import Button from './UI/Button';
import CartContext from './store/CartContext';

export default function MealItem({ meal }) {
    const cartcxt = useContext(CartContext);
    const [showMessage, setShowMessage] = useState(false);

    function handleAddMealCart() {
        cartcxt.addItem(meal);
        setShowMessage(true);

        // Hide the message after 2 seconds
        setTimeout(() => setShowMessage(false), 2000);
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

                {/* Success message */}
                {showMessage && (
                    <p className="add-to-cart-message">Item added to cart!</p>
                )}
            </article>
        </li>
    );
}
