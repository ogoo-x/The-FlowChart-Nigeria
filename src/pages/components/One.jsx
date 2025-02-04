// Depenndencies
import React, {useState, useRef} from 'react';
import styles from "./One.module.css";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { div } from 'framer-motion/client';

// Assets
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import Divider from "../../assets/Divider.svg";
import Slideshow from './Slideshow';
import MenstruationStats from './MenstruationStats';
import PeriodPovertyStats from './PeriodPovertyStats';
import PeriodPovertyCalendar from './PPCalendarAnimation';

// Illustrations for landing page
import NoSanitaryPad from "../../assets/HomepageIllustrations/NoSanitaryPad.svg";
import NoMenstrualEducation from "../../assets/HomepageIllustrations/NoMenstrualEducation.svg";
import NoWASH from "../../assets/HomepageIllustrations/NoWASH.svg";
import DropoutPieChart from './DropoutPieChart';


function One() {

  return (
    <div>
    <div className={styles.homepage}>
    <div className= {styles.content}>
    <div className={styles.content1}>
      <h1>Transform Lives Through Data-Driven Impact.</h1> <br />
          <p>The FlowChart maps the scale and distribution of period poverty throughout Nigeria, empowering NGOs and organizations to
             direct their resources where they're needed most. Our interactive visualization platform turns complex data into actionable insights.
             <br /><br />
             Now, stay with us to <AnchorLink href='#introduction' className={styles.anchorLink}> learn more about the problem of period poverty </AnchorLink> 
             <br />and <AnchorLink href='#introduction' className={styles.anchorLink}> our unique approach to solving it.</AnchorLink></p>
    </div>
    </div>
    </div>
    <img src={Divider} className={styles.divider}/>
    <div className={styles.content} id='introduction'>
    <div className={styles.content2}>
      <div>
        <h2>
          What is <em>Period Poverty?</em> 
        </h2>
        <p>Every month, more than 60 million females menstruate in Nigeria.<br /></p>
        <MenstruationStats />
        <p>However, more than half of them cannot afford menstrual products or access to safe water 
          and sanitation to manage their menstrual health and hygiene. This interrupts their lives, 
          rights, and freedoms. <br /><br />
          Period poverty refers to the inability to afford or access basic resources 
          needed for proper menstrual health management.</p>
        <PeriodPovertyStats />
          
        <br />
        <h3>WHAT DOES PERIOD POVERTY LOOK LIKE?</h3>
        <div className={styles.ppcards}>
          <div className={styles.ppCard}>
            <p>Lack of access to adequate and quality sanitary products.</p>
            <img src={NoSanitaryPad} className={styles.illustration} alt="Illustration of sanitary pads cancelled" />
          </div>

          <div className={styles.ppCard}>
            <p>Poor Knowledge on menstrual health and hygiene.</p>
            <img src={NoMenstrualEducation} className={styles.illustration} alt="Illustration of teacher in classroom cancelled" />
          </div>

          <div className={styles.ppCard}>
            <p>Lack of access to clean water and proper sanitation facilities.</p>
            <img src={NoWASH} className={styles.illustration} alt="Illustration of handwashing cancelled" />
          </div>
        </div>
      </div>
    </div>
    </div>

    {/* Why Period Poverty should be everybody’s business*/}
    <div>
    <div>
      <div className={styles.content}>
        <h2>
          Now, why should <em>Period Poverty</em> be everybody’s business 
        </h2><br />
       <div className={styles.calender}>
         <PeriodPovertyCalendar />
       </div>
       <div className={styles.piechart}>
         <DropoutPieChart />
       </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default One