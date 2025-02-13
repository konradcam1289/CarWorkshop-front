import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import WorkerPanel from "./components/WorkerPanel";
import ClientPanel from "./components/ClientPanel";
import Login from "./components/Login";
import Register from "./components/Register";
import Payment from "./components/Payment";
import ServicesList from "./components/ServicesList"; // Importujemy listę usług
import "./App.css"; // Importujemy globalne style

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/home" element={<AdminPanel />} />
          <Route path="/worker/home" element={<WorkerPanel />} />
          <Route path="/client/home" element={<ClientPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/services" element={<ServicesList />} /> {/* 🔹 Dodana trasa */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
