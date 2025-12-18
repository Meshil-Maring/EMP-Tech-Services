import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Transaction from "./components/pages/Transaction";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-up" element={<Signup />}></Route>
      <Route path="/log-in" element={<Login />}></Route>
      <Route path="/transaction" element={<Transaction />}></Route>
    </Routes>
  );
}

export default App;
