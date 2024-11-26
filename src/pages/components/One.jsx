// Depenndencies
import React, {useState, useRef} from 'react';
import styles from "./One.module.css";
import AnchorLink from 'react-anchor-link-smooth-scroll';

// Assets
import { FaArrowRightLong } from "react-icons/fa6";
import Divider from "../../assets/Divider.svg";
import Slideshow from './Slideshow';

// Illustrations for landing page
import NoSanitaryPad from "../../assets/HomepageIllustrations/NoSanitaryPad.svg";
import NoMenstrualEducation from "../../assets/HomepageIllustrations/NoMenstrualEducation.svg";
import NoWASH from "../../assets/HomepageIllustrations/NoWASH.svg";
import { div } from 'framer-motion/client';

function One() {

  return (
    <div>
    <div>
        <p>
            At <span className='tfcred'>The FlowChart Nigeria</span> , we are building the most 
            comprehensive database on <span className='tfcpink'>period poverty</span> in Nigeria. 
            We plan to put this out in the form of an <span className='tfcred'> interactive 
            map.</span> This is to help <span className='tfcpink'>you</span> be aware and make data driven 
            decisions in the fight against period poverty.
        </p>
    </div>
    <img src={Divider} className={styles.divider}/>
    <div className={styles.content} id='introduction'>
    <div className={styles.content2}>
      <div>
        <h2>
          What is <em>Period Poverty?</em> 
        </h2>
        <p>
          Every month, more than two billion people around the world menstruate. <br />
          Menstruation – or <em>period</em> – is a natural and healthy process, yet 
          millions of women and girls cannot afford menstrual products or access to safe water 
          and sanitation to manage their menstrual health and  hygiene. This interrupts their lives, 
          rights, and freedoms. <br /><br />
          Period poverty refers to the inability to afford or access basic resources 
          needed for proper menstrual health management. 
          </p>
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
            <p>Lack of access to clean water as well as clean and safe sanitation facilities.</p>
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
          Why <em>Period Poverty</em> should be everybody’s business 
        </h2><br />
        <p>
          The lack of access to basic menstrual products like sanitary pads or tampons means that these 
          females have to resort to other uncomfortable and sometimes harmful practices. 
          <br />A lack of basic knowledge on what goes on inside their body and on proper menstrual hygiene 
          leads to the normalisation of certain abnormalities, taboos and diseases.
          <br />Some girls miss as much as <strong>100 days</strong> of their school calendar due to their periods  
        </p>
      </div>
      </div>
      </div>
    </div>
  )
}

export default One