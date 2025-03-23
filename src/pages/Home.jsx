import One from "./components/One";
import Two from "./components/Two";
import Four from "./components/Four";
import Footer from "./components/Footer";
import "../App.css";

function Home() {
    return (
      <div className="section">
        <One />
        <Two />
        <Four />
        <Footer />
      </div>
    );
  }
  
  export default Home;
  