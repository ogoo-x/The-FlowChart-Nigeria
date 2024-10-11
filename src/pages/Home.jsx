import "./Home.css";
import One from "./components/One";
import Footer from "./components/Footer";

function Home() {
    return (
      <div className="section">
        <div>
          <One />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    );
  }
  
  export default Home;
  