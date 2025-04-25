import React from "react";
import logo from "../../Assets/logo/LOGO Footer.png"
import "./Footer.scss"





function Footer() {

    return (
        <div className="footer">
            <img src={logo} className="logo" alt="Logo Kasa" />
            <p>© 2020 Kasa. All rights reserved</p>
        </div>
    )
}

export default Footer