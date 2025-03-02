import React, {useState, useEffect} from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import styles from './Four.module.css';
import CTACard from './CTACard';
import Source from './Source';

// Images for CTA cards
import Advocacy from "../../assets/CTA/Advocacy.png";
import Data from "../../assets/CTA/Data.png";
import Interact from "../../assets/CTA/Interact.png";
import Resources from "../../assets/CTA/Resources.png";
import Share from "../../assets/CTA/Share.png";

const acData = [
    {
        year:'2017',
        Original: 44.1,
    },
    {
        year:'2020',
        Original: 31.4,
    },
    {
        year:'2022',
        Original: 23.1,
    },
    {
        year:'2024',
        Original: 14.6,
    },
]

function Four() {

    const [firstCount, setFirstCount] = useState(0);
    const [secondCount, setSecondCount] = useState(0);
  
    useEffect(() => {
      // Animation duration in milliseconds
      const duration = 2000;
      // Number of steps for smooth animation
      const steps = 60;
      const firstInterval = duration / steps;
      const firstIncrement = 130 / steps;
      const secondIncrement = 300 / steps;
  
      const animateCounters = () => {
        for (let step = 0; step <= steps; step++) {
          setTimeout(() => {
            setFirstCount(Math.min(Math.round(step * firstIncrement), 130));
            setSecondCount(Math.min(Math.round(step * secondIncrement), 300));
          }, step * firstInterval);
        }
      };
  
      // Start animation when component is in view
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
  
      const element = document.getElementById('counter-container');
      if (element) observer.observe(element);
  
      return () => observer.disconnect();
    }, []);

  return (
    <div>
        <div className={styles.content}>
            <h2>Things are not all red though, something is being done about <em>Period Poverty</em></h2>
            <div className={styles.counter}>
                <div id='counter-container'>
                    <h2>{firstCount}</h2>
                    <h3>Not for profit organisations 
                        are committed to solving 
                        period poverty</h3>
                </div>
                <div id='counter-container'>
                    <h2>{secondCount}</h2>
                    <h3>Not for profit organisations 
                        are involved in some way in 
                        solving period poverty</h3>
                </div>
            </div>
        </div>

        <div className={styles.content}>
            <h2>However, the efforts are not enough.</h2>
            <p>Only a small percentage of the period poverty burden has been eased as a result of the efforts of these 
            organisations. Also, because of the intermittent nature of the menstrual cycle, interventions require more long 
            term solutions. An incorporation of this disparity in the legislation is important to making a lasting impact on the 
            period poverty burden</p>
            <br /><br />
            <div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={acData}>
                    <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B94A75" stopOpacity={0.8}/>  

                        <stop offset="95%" stopColor="#B94A75" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3F413C" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3F413C" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Original" stroke="#B94A75" fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer><br />
            <Source LinktoSource="10.18203/2320-1770.IJRCOG20171932"/>
            </div>
        </div>

        <div className={styles.content}>
            <h2>This is where YOU come in.</h2>
            <p>Now you know all this, here are some things you can do with this information:</p> <br /><br />
            <div className={styles.Calltoact}>
                <div className={styles.rowOne}>
                <CTACard 
                    title={"SHARE"}
                    icon={Share}
                    iconAlt={"Share Icon"}
                    text={"At The Flow Chart , we believe that data visualisations are great ways to tell stories and promote awareness."}
                    cta={"share this website with someone"}/>

                <CTACard 
                    title={"INTERACT"}
                    icon={Interact}
                    iconAlt={"Interact with Map"}
                    text={"The charts and maps are great ways to track and inform our effort and progress in addressing period poverty."}
                    cta={"interact with the map here"}/>
                </div>
                <div className={styles.rowTwo}>
                <CTACard 
                    title={"RESOURCES"}
                    icon={Resources}
                    iconAlt={"Person reading book"}
                    text={"The resources range from reproductive health education to problems we can avoid in period poverty campaigns"}
                    cta={"go to the resources page"}/> 
                
                <CTACard 
                    title={"ADVOCACY"}
                    icon={Advocacy}
                    iconAlt={"Hand holding placard."}
                    text={"Data promotes discourse and advocacy. These tools are necessary for addressing period poverty in Nigeria"}
                    cta={"join the conversation"}/>
                </div>
                <CTACard 
                    title={"CONTRIBUTE"}
                    icon={Data}
                    iconAlt={"cONTRIBUTE Icon"}
                    text={"Send in any data you have on period poverty here. The more detailed the map is, the better."}
                    cta={"submit your data here"}/>           
            </div>
        </div>
    </div>
  )
}

export default Four