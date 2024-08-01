import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal ({children, open, className = '', onclose}){

    const dialog = useRef()

    useEffect(() => {
        const modal = dialog.current
        if(open){
            modal.showModal()
        }

        return () => modal.close()
    }, [open])

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onclose} >{children}</dialog>,
        document.getElementById('modal')
    )
}