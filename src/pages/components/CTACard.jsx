import styles from  "./Four.module.css";
import React from 'react'
import PropTypes from 'prop-types';

function CTACard({title, icon, iconAlt, text, cta, onClack}) {
  return (
    <div className={styles.CTACard}>
      <h3>{title}</h3>
      <img src={icon} alt={iconAlt} />
      <p>{text}</p>
      <button onClick={onClack}>{cta}</button>
    </div>
  )
}

export default CTACard
