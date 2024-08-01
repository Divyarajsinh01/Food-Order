import { useContext } from "react";
import { Modal } from "./Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../../util/formatter";
import Button from "./Button";
import UserPogressContext from "../store/UserProgress";
import CartItem from "../CartItem";

export function Cart() {
    const cartCtx = useContext(CartContext)
    const userCtx = useContext(UserPogressContext)

    const totalPrice = cartCtx.items.reduce((totalprice, item) => {
        return totalprice + item.quantity * item.price
    }, 0)

    const handleCloseCart = () => {
        userCtx.hideCart()
    }

    const handleGoToCheckOut = () => {
        userCtx.showCheckout()
    }

    return <Modal className="cart" open={userCtx.progress === 'cart'} onclose={userCtx.progress === 'cart' ?handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onDecrease={() => cartCtx.removeItem(item.id)}
                    onIncrease={() => cartCtx.addItem(item)}
                />
            ))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
        <p className="modal-action">
            <Button textOnly onClick={handleCloseCart}>close</Button>
            {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckOut}>checkout</Button>}
        </p>
    </Modal>
}