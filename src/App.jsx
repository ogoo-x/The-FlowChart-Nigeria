import Home from "./pages/Home";
import Nav from "./pages/Nav";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <div>
      <Nav />
      <div className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="resources" element={<Resources />}/>
          <Route path="contact" element={<Contact />}/>
        </Routes>
      </div>
    </div>
      );
}

export default App;
