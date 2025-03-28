import React from 'react';
import styles from "./Two.module.css";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Source from './Source';
import { style } from 'framer-motion/client';

import GirlIconFilled from "../../assets/GirlIconFilled.svg";
import GirlIconOutline from "../../assets/GirlIconOutline.svg";
import StatComparison from './HomepageAnimations/StatComparison';

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
            <XAxis type="number"/>
            <YAxis dataKey="name" type="category" />
            {/* <Tooltip content={({ activeLabel, payload }) => (
                <div className="custom-tooltip">
                  <p>{activeLabel}</p>
                  <p>{payload[0].value}%</p>
                </div>
              )} /> */}
            <Bar dataKey="value" fill="#fff9f5" barSize={30} stroke="#3F413C" strokeWidth={1}/>
          </BarChart>
        </ResponsiveContainer><br />
        <Source LinktoSource={"https://www.bbc.com/news/world-africa-66423981"}/>
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
        <StatComparison />
        </div>
        
        <div>
          <div>
            
          </div>
        </div>
       </div>
    </div>
    </div>
  )
}

export default Two