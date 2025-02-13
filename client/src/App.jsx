import "./App.css";
import Login from "./Components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import { Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
    </Routes>
  );
}

export default App;
