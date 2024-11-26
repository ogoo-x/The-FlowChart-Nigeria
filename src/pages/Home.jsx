import One from "./components/One";
import Two from "./components/Two";
import Slideshow from "./components/Slideshow";
import Three from "./components/Three";
import Four from "./components/Four";
import Footer from "./components/Footer";
import "../App.css";

function Home() {
    return (
      <div>
        <One />
        <Slideshow />
        <Two />
        <Three />
        <Four />
        <Footer />
      </div>
    );
  }
  
  export default Home;
  