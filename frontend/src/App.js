import { useState } from "react";
import Employees from "./Employees";
import Attendance from "./Attendance";
import Layout from "../src/component/Layout";
import Navbar from "../src/component/Navbar";

function App() {
  const [page, setPage] = useState("employees");

  return (
    <Layout>
      <h1>HRMS Lite</h1>
      <Navbar page={page} setPage={setPage} />

      {page === "employees" && <Employees />}
      {page === "attendance" && <Attendance />}
    </Layout>
  );
}

export default App;
