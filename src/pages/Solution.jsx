import React from 'react';
import styles from './Three.module.css';
import Map from './components/Map';
import lgaData from "../assets/nigeria_lga.geo.json";
import stateData from "../assets/nigeria_state.geo.json";
import Footer from './components/Footer';

function Solution() {
  return (
    <div>
      <div id='map' className={styles.content}>
      <Map lgaData={lgaData} stateData={stateData}/>
      </div>
      <Footer />
    </div>
    
  )
}

export default Solution