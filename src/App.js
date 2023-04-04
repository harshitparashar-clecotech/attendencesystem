import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../src/Components/SignUp/Signup";
import Login from "./Components/SignUp/Login";
import Home from "./Components/LandingPages/Home";
import AttendanceTracker from "./Components/LandingPages/AttendanceTracker";
import Navbar from "./Components/Navbar/Navbar";
import { createContext, useState } from "react";
import OrganisationMenber from "./Components/LandingPages/OrganisationMember";

export const UserContext = createContext();
function App() {
  const [LoginUser, setLogin] = useState(false);

  return (
    <UserContext.Provider value={{ LoginUser, setLogin }}>
      <BrowserRouter>

        <Navbar />
        <Routes>
          <Route path="/loginPage" element={<Home />}></Route>
          <Route
            path="/attendenceTracker"
            element={<AttendanceTracker />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/orgination" element={<OrganisationMenber/>}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
