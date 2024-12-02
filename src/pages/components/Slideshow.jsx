import React, {useRef} from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import styles from "./Slideshow.module.css"

function Slideshow()  {
  const targetRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <div className={styles.parent} ref={targetRef}>
       <div className={styles.slideShow}>
        <motion.div style={{x}} className={styles.slide}>
          <motion.div 
            className={`${styles.slides} ${styles.before}`}>
          <div className={styles.pocket}>
            <h3>BEFORE</h3> <br /><br />
            <p>Even before every cycle, the effects of period poverty are seen in these females</p>
              <li>Anxiety and Stress about the onset of menstruation and potential challenges such as 
              the financial burden of purchasing menstrual products</li>
              <li>Some of these females lose their dignity by engaging in prostitution to generate money for these products</li>
          </div>
          </motion.div>

          <motion.div 
            className={`${styles.slides} ${styles.during}`}>
          <div className={styles.pocket}>
            <h3>DURING</h3><br /><br />
            <li>Lack of access to menstrual products can cause anxiety and stress about potential leaks or stains, impacting mental health</li>
            <li>Pain and Cramps: Period pain can be exacerbated by poor hygiene and lack of pain relief options.</li>
            <li>Physical Discomfort: Inadequate menstrual hygiene can lead to infections, such as urinary tract infections and reproductive tract infections</li>
            <li>Limited Mobility: Fear of leaks or stains can restrict movement and participation in daily activities.</li>
            <li>Social Stigma: Period taboos and stigma can lead to shame and embarrassment, further isolating individuals.</li>
          </div>
          </motion.div>

          <motion.div 
            className={`${styles.slides} ${styles.after}`}
            >
          <div className={styles.pocket}>
            <h3>AFTER</h3><br /><br />
            <p>The imprint of period poverty lingers long after the 2-7 day long period is over</p>
            <li>Long-Term Health Consequences: Repeated infections and poor hygiene practices can lead to chronic health issues.</li>
            <li>Economic Impact: Missed school or work days due to period poverty can have long-term economic consequences.</li>
            <li>Psychological Impact: Ongoing stigma and shame can negatively impact mental health and self-esteem.</li>
          </div>
          </motion.div>
        </motion.div> 
        </div>
      </div> 
  )
}

export default Slideshow