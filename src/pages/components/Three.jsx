import React from 'react';
import styles from './Three.module.css';
import Map from './Map';
import lgaData from "../../assets/nigeria_lga.geo.json";
import stateData from "../../assets/nigeria_state.geo.json";

function Three() {
  return (
    <div>
      <h2><em>The FlowChart Map is coming soon</em></h2>
    </div>
    // <div id='map' className={styles.content}>
    //  <Map lgaData={lgaData} stateData={stateData}/>
    // </div>
  )
}

export default Three