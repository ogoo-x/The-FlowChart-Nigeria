import styles from  "./Four.module.css";
import React from 'react'
import PropTypes from 'prop-types';

function CTACard({title, icon, iconAlt, text, cta, onClack}) {
  return (
    <div className={styles.CTACard}>
      <h3>{title}</h3>
      <img src={icon} alt={iconAlt} />
      <p>{text}</p>
      <a href={onClack}>{cta}</a>
    </div>
  )
}

export default CTACard
