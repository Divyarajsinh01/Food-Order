import { createContext, useState } from "react";

const UserPogressContext = createContext({
    progress: '',
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckOut: () => { }
})

export function UserPogressContextProvider({ children }) {

    const [userprogress, setUserProgress] = useState('')

    const showCart = () => {
        setUserProgress('cart')
    }

    const hideCart = () => {
        setUserProgress('')
    }

    const showCheckout = () => {
        setUserProgress('checkout')
    }

    const hideCheckOut = () => {
        setUserProgress('')
    }

    const userCtx = {
        progress: userprogress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckOut
    }

    return <UserPogressContext.Provider value={userCtx}>
        {children}
    </UserPogressContext.Provider>
}

export default UserPogressContext