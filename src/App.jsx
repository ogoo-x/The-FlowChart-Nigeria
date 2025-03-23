import Home from "./pages/Home";
import Nav from "./pages/Nav";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Solution from "./pages/Solution";
import "./App.css"

import { Route, Routes } from "react-router-dom";



function App() {

  return (
    <div>
      <Nav />
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="map" element={<Solution />} />
          <Route path="resources" element={<Resources />}/>
          <Route path="contact" element={<Contact />}/>
          <Route path="about" element={<About />}/>
        </Routes>
      </div>
    </div>
      );
}

export default App;
