import React from 'react';
import styles from "./Two.module.css";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Source from './Source';
import { style } from 'framer-motion/client';

import GirlIconFilled from "../../assets/GirlIconFilled.svg";
import GirlIconOutline from "../../assets/GirlIconOutline.svg";

const dataHBarChart = [
  {
    name: 'Nigeria',
    value: 7,
    fill: '#782835'
  },
  {
    name: 'South Africa',
    value: 0.8,
    fill: '#B94A75'
  },
  {
    name: 'USA',
    value: 0.25, 
    fill: '#782835'
  },
  {
    name: 'Kenya',
    value: 0.7,
    fill: '#B94A75'
  }
];

function Two() {
  return (
    <div>
        <div className={styles.content}>
    <div className={styles.content2}>
      <div>
        <h2>
          Nigeria is in <em>Period Poverty</em>... 
        </h2><br />
        <p>
          Over 37 million females in Nigeria experience period poverty as we know it. 
          It costs about 7% of the minimum wage in the country to purchase period products for a month.   
        </p>
        <br />
        <div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={dataHBarChart} layout="vertical">
            <XAxis type="number" label="Percentage of Minimum Statutory Wage Used"/>
            <YAxis dataKey="name" type="category" />
            {/* <Tooltip content={({ activeLabel, payload }) => (
                <div className="custom-tooltip">
                  <p>{activeLabel}</p>
                  <p>{payload[0].value}%</p>
                </div>
              )} /> */}
            <Bar dataKey="value" fill="#fff9f5" barSize={30} stroke="#3F413C" strokeWidth={1.5}/>
          </BarChart>
        </ResponsiveContainer><br />
        <Source SourceText={"BBC Africa Visual Journalism Research 2023"} LinktoSource={"https://www.bbc.com/news/world-africa-66423981"}/>
        </div>
       </div>
    </div>
    </div>

    <div className={styles.content}>
    <div className={styles.content2}>
      <div>
        <h2>
          However, <em>Period Poverty</em> does not affect all of Nigeria in the same way.
        </h2><br />
        <p>
          While period poverty is endemic in certain cities, it exists as nothing but 
          a mere myth in others. The burden of period poverty varies even between towns in the same cities. This knowledge emphasizes the need for directed efforts in addressing period poverty.
        </p>
        <br />
        {/* <div className={styles.stickFigures}>
          <div>
              <p>1 in 5 females in anambra lack access to period products.</p>
              <div>
                <img src={GirlIconFilled} alt="GirlIconFilled" />
                <img src={GirlIconOutline} alt="GirlIconOutline" />
                <img src={GirlIconOutline} alt="GirlIconOutline" />
                <img src={GirlIconOutline} alt="GirlIconOutline" />
                <img src={GirlIconOutline} alt="GirlIconOutline" />
              </div>
          </div>
          <span></span>
          <div>
              <p>1 in 5 females in anambra lack access to period products.</p>
              <div>
                <img src={GirlIconFilled} alt="GirlIconFilled" />
                <img src={GirlIconOutline} alt="GirlIconOutline" />
                <img src={GirlIconOutline} alt="GirlIconOutline" />
                <img src={GirlIconOutline} alt="GirlIconOutline" />
                <img src={GirlIconOutline} alt="GirlIconOutline" />
              </div>
          </div> */}
        </div>
        
        <div>
          <div>
            
          </div>
        </div>
       </div>
    </div>
    </div>
    </div>
  )
}

export default Two