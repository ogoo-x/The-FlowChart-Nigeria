import React from 'react';
import styles from "./Footer.module.css";
import { AiFillInstagram, AiFillTikTok } from "react-icons/ai";
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
      <div className='flex flex-col justify-center'>
        <p className='text-center'>Visit our Socials to learn more about how we are tackling period poverty and ways you can help</p>
        <div className={styles.smGroup}>
          <a href="https://www.facebook.com/profile.php?id=61566762519928" ><FaFacebookSquare size={30} className={styles.reactIcons}/></a>
          <a href="https://x.com/TheFlowChartNig?t=X4LxgnuER3_QRJ1Bk7yxpg&s=08"><FaSquareXTwitter size={30} className={styles.reactIcons} /></a>
          <a href="https://www.instagram.com/theflowchartnigeria/"><AiFillInstagram size={30} className={styles.reactIcons} /> </a>
          <a href="#"><AiFillTikTok size={30} className={styles.reactIcons}/></a>
          <Mailto email="theflowchartnig@gmail.com" subject="Fighting Period Poverty" body="I would like to enquire/collaborate"><MdEmail size={30} className={styles.reactIcons} /></Mailto>
        </div>
      </div>
      
      <div>
        <p className='text-center'>©The FlowChart Nigeria 2024.</p>
      </div>
    </footer>
  )
}
export default Footer