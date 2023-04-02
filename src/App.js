import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../src/Components/SignUp/Signup";
import Login from "./Components/SignUp/Login";
import Home from "./Components/LandingPages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/landing_page" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
