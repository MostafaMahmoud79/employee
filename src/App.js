import { HashRouter as Router, Routes, Route } from "react-router-dom";
import EmpListing from "./EmpListing";
import EmpCreate from "./EmpCreate";
import EmpDetail from "./EmpDetail";
import EmpEdit from "./EmpEdit";
import "./App.css";

function App() {
  return (
    <Router basename="/employee">
      <div className="App">
        <h1>Employee Management System</h1>
        <Routes>
          <Route path="/" element={<EmpListing />} />
          <Route path="/create" element={<EmpCreate />} />
          <Route path="/detail/:empid" element={<EmpDetail />} />
          <Route path="/edit/:empid" element={<EmpEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;