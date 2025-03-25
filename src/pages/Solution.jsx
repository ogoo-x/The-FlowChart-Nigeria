import React from 'react';
import styles from './Three.module.css';
import Map from './components/Map';
import lgaData from "../assets/nigeria_lga.geo.json";
import stateData from "../assets/nigeria_state.geo.json";
import Footer from './components/Footer';
import periodData from "../assets/periodData.csv";

function Solution() {
  return (
    <div>
      <div id='map' className='container mt-24 mx-8'>
      <Map lgaData={lgaData} stateData={stateData} periodData={periodData}/>
      </div>
      <Footer />
    </div>
    
  )
}

export default Solution