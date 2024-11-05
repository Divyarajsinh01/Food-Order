import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from './store/CartContext'
import UserPogressContext from './store/UserProgress'

export default function Header() {

  const cartCntx = useContext(CartContext)
  const userctx = useContext(UserPogressContext)

  const totalNumberOfQuantity = cartCntx.items.reduce((totalnumberItems, item) => {
    return totalnumberItems + item.quantity
  }, 0)

  const handleShowCart = () => {
    userctx.showCart()
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt="" />
        <h1>Rudra Food App</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>cart ({totalNumberOfQuantity})</Button>
      </nav>
    </header>
  )
}
