// import "./assets/css/app.css";
// route path msh blm kedetect
import "assets/css/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "pages/HomePage";
import Details from "pages/Details";
import Cart from "pages/Cart";
import Congratulation from "pages/Congratulation";
import NotFound from "pages/NotFound";
function App() {
  return (
    <div className="App">
      <Router>
        {/* <h1 className="text-9xl">coba</h1> */}
        {/* <Route path="/" component={ HomePage} /> */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/categories/:idc" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/congratulation" element={<Congratulation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
