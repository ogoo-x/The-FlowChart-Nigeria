import styles from  "./Four.module.css";
import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

function CTACard({title, icon, iconAlt, text, cta, onClack}) {
  return (
    <div className={styles.CTACard}>
      <h3>{title}</h3>
      <img src={icon} alt={iconAlt} />
      <p>{text}</p>
      <NavLink to={onClack}>{cta}</NavLink>
    </div>
  )
}

export default CTACard
