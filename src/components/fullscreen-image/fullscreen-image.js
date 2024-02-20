import React , { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./fullscreen-image.scss";

const FullscreenImage = ({ children,image, alt }) => {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => {
        setIsOpen(true);
    }
    const close = () => {
        setIsOpen(false);
    }
    useEffect(() => {
        const escHandler = (event) => {
            if (event.keyCode === 27) {
                close();
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", escHandler);
        }
        return () => {
            document.removeEventListener("keydown", escHandler);
        }
    }, [isOpen]);
    return (<>
        <div onClick={open}>{children}</div>
        
        {isOpen ? createPortal(
            <div className="fullscreen-image" onClick={close}>
                <i className="fa-solid fa-xmark"></i>
                {children}
            </div>,
            document.body
        ) : null   }
    </>
    );
}
export default FullscreenImage;