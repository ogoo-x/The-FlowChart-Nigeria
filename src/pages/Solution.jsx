import React from 'react';
import styles from './Three.module.css';
import Map from './components/Map';
import lgaData from "../assets/nigeria_lga.geo.json";
import stateData from "../assets/nigeria_state.geo.json";
import Footer from './components/Footer';
import periodData from "../assets/periodData.csv";
import ResearchInsights from './components/ResearchInsights';

function Solution() {
  return (
    <div>
      <header className="mt-20 content">
        <h1 className="text-3xl font-bold text-rose-900">Nigeria Period Poverty Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Explore the geographical distribution of period poverty indicators across Nigeria
          and learn about the research context behind the data.
        </p>
      </header>

      <div id='map' className='content container mt-8'>
      <Map lgaData={lgaData} stateData={stateData} periodData={periodData}/>
      </div>

      <ResearchInsights />
      <div className="py-4 text-center text-gray-500 text-sm">
        <p className="mt-2">Data last updated: March 2025</p>
      </div>
      <Footer />
    </div>
    
  )
}

export default Solution