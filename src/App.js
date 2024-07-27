import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import MainPets from "./Components/MainPets";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainPets />} />
          </Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
