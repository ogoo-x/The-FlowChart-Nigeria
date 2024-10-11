import React, {useState, useRef} from 'react';
import "../Home.css";
import Rocket from "../../assets/rocket.svg"

function One() {

  const formRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  const scriptUrl = "https://script.google.com/macros/s/AKfycbxBLAeYsZ650ymjQLlwQCGTXbGt7UBCp9PMKscRJsAZ7wG8o05sJJa_76pzy5V23vQ-/exec";

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(scriptUrl, {method: 'POST', body: new FormData(formRef.current)})
    .then(res => {
      console.log("SUCCESSFULLY SUBMITTED!")
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='homePage'>
    <div>
        <p>
            At <span className='tfcred'>The FlowChart Nigeria</span> , we are building the most 
            comprehensive database on <span className='tfcpink'>period poverty</span> in Nigeria. 
            We plan to put this out in the form of an <span className='tfcred'> interactive 
            map.</span> This is to help <span className='tfcpink'>you</span> be aware and make data driven 
            decisions in the fight against period poverty.
        </p>
    </div>
    <br /><br /><br />

    <div>
      <div>
        <p className='comingSoon'>
          <div className='straightLine'></div>
          We are Coming Soon
        </p>
      </div>
        <h2 className='launchTagline'>Be the first to be notified when we <span className='tfcred '>launch.</span></h2>
    </div>
    <br /><br /><br />

    <div className='rocketImage'>
      <img src={Rocket} alt="Line Drawing of a Rocket"/>
    </div>

    <br /><br /><br /><br /><br /><br /><br /><br />
    <div>
      <div className='amazingCta'>
      <input className="c-checkbox" type="checkbox" id="checkbox" />
      <div className="c-formContainer">
        <form ref={formRef} onSubmit={handleSubmit} className="c-form" name="google-sheet">
          <input name="email" className="c-form__input" placeholder="Please enter your email address" type="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required />
          <label className="c-form__buttonLabel" for="checkbox">
            <button className="c-form__button" type="submit">Send</button>
          </label>
          <label className="c-form__toggle" for="checkbox" data-title="Notify me"></label>
        </form>
      </div>
      </div>
      <div className='spamMessage'>
        <p>We will also be sending you monthly updates on our progress 
           and other interesting things in the period space.
           <br /> We promise not to spam you.</p>
      </div>
    </div>

    </div>
    
  )
}

export default One