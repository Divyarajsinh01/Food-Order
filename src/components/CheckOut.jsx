import { useContext } from "react";
import { currencyFormatter } from "../util/formatter";
import { Modal } from "./UI/Modal";
import CartContext from "./store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserPogressContext from "./store/UserProgress";
import useFetch from "../hooks/usefetch";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function CheckOut() {

    const { data, error, loading: isSending, sendRequest, clearData } = useFetch('http://localhost:3000/orders', requestConfig)
    const cartCtx = useContext(CartContext)
    const userCtx = useContext(UserPogressContext)

    const totalPrice = cartCtx.items.reduce((totalprice, item) => {
        return totalprice + item.quantity * item.price
    }, 0)

    const handleClosecheckOut = () => {
        userCtx.hideCheckOut()
    }

    const handleFinish = () => {
        userCtx.hideCheckOut()
        cartCtx.clearCart()
        clearData()
    }

    const handleSumbit = (event) => {
        event.preventDefault()

        const fd = new FormData(event.target)

        const customerData = Object.fromEntries(fd.entries())

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
        // fetch('http://localhost:3000/orders', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         order: {
        //             items: cartCtx.items,
        //             customer: customerData
        //         }
        //     })
        // })
    }

    let action = (<>
        <Button type="button" textOnly onClick={handleClosecheckOut}>Close</Button>
        <Button>Submit Order</Button>
    </>)

    if (isSending) {
        action = <span>Sending Order Data...</span>
    }

    if (data && !error) {
        return (
            <Modal open={userCtx.progress === 'checkout'} onclose={handleFinish}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back o you within more details via email within next few minutes.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return <Modal open={userCtx.progress === 'checkout'} onclose={handleClosecheckOut}>
        <form onSubmit={handleSumbit}>
            <h2>CheckOut</h2>
            <p>Total Amount : {currencyFormatter.format(totalPrice)}</p>

            <Input label="Full Name" type="text" id="name" />
            <Input label="E-Mail Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>

            {error && <Error title="Failed to submit Orders" message={error} />}

            <p className="modal-actions">
                {action}
            </p>
        </form>
    </Modal>
}