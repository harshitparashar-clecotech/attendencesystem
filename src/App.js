import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../src/Components/SignUp/Signup";
import Login from "./Components/SignUp/Login";
import Home from "./Components/LandingPages/Home";
import AttendanceTracker from "./Components/LandingPages/AttendanceTracker";
import Navbar from "./Components/Navbar/Navbar";
import { createContext,useState } from "react";

export const UserContext = createContext();
function App() {
  const [LoginUser, setLogin] = useState(false);
  return (
    <UserContext.Provider value={{ LoginUser, setLogin }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/attendenceTracker"
            element={<AttendanceTracker />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/landing_page" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
