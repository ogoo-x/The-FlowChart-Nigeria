import { useState } from "react";
import "./Nav.css";
import {NavLink, Outlet} from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Logo from "../assets/Headline.svg";

function Nav() {
  
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open)
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 900) {
      setOpen(false);
    }
  };

  return (
    <header className="header">
      {/* {`${open ? "navopen" : "scaledown"}`} */}
        <nav className="nav">
            <NavLink to="/">
              <img src={Logo} alt="The FlowChart Logo" className="navLogo" /> 
            </NavLink>
            <div className={`navigationMenu ${open ? "show-menu" : ""}`}>
              <ul className="navList">
                <li className="navItem">
                  <AnchorLink href='#map'>
                    <NavLink 
                      to="/"
                      onClick={closeMenuOnMobile}>
                      <button>MAP</button></NavLink>
                  </AnchorLink>
                  
                </li> 
                <li className="navItem">
                  <NavLink 
                      to="/resources"
                      onClick={closeMenuOnMobile}>
                      <button>RESOURCES</button></NavLink>
                </li>
                <li className="navItem">
                  <NavLink 
                      to="/about"
                      onClick={closeMenuOnMobile}>
                      <button>ABOUT US</button></NavLink>
                </li>
                <li className="navItem">
                  <AnchorLink href="#footer" onClick={closeMenuOnMobile}>
                  <button>CONTACT</button>
                  </AnchorLink>
                </li>
              </ul>
            </div>

            <div onClick= {toggleMenu}className="hamburger">
              <span className={`cheese ${open ? "cheesex" : ""}`}></span>
              <span className={`ham ${open ? "hamx" : ""}`}></span>
              <span className={`bun ${open ? "bunx" : ""}`}></span>
            </div>      
        </nav>
        <Outlet />
    </header>
  );
}

export default Nav;
