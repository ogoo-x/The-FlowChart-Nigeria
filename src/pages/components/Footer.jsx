import React from 'react';
import styles from "./Footer.module.css";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io5";
import {FaFacebookSquare} from "react-icons/fa";
import {FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function Footer() {
  const Mailto = ({ email, subject = '', body = '', children }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
  
    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };

  return (
    <footer className={styles.crimsonTide} id="footer">
      <div className={styles.footer}>
        <p className={styles.cta}>Visit our Socials to learn more about how we are tackling period poverty and ways you can help</p>
        <div className={styles.smGroup}>
          <a href="https://web.facebook.com/profile.php?id=61567180061933" ><FaFacebookSquare size={30} className={styles.reactIcons}/></a>
          <a href="https://x.com/TheFlowChartNig?t=X4LxgnuER3_QRJ1Bk7yxpg&s=08"><FaSquareXTwitter size={30} className={styles.reactIcons} /></a>
          <a href="https://www.instagram.com/theflowchartnigeria/"><AiFillInstagram size={30} className={styles.reactIcons} /> </a>
          <a href="#"><IoLogoLinkedin size={30} className={styles.reactIcons}/></a>
          <Mailto email="theflowchartnig@gmail.com" subject="Fighting Period Poverty" body="I would like to enquire/collaborate"><MdEmail size={30} className={styles.reactIcons} /></Mailto>
        </div>
      </div>
      
      <div>
        <p className='text-center'>©The FlowChart 2024-2025.</p>
      </div>
    </footer>
  )
}
export default Footer