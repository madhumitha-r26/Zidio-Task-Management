import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import { Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>

    </Routes>
  );
}

export default App;
