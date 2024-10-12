import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/home";
import ProductScreen from "./screens/product";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductScreen />} />
    </Routes>
  </Router>
);

export default App;
