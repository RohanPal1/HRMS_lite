import { useEffect, useState } from "react";
import { api } from "./api";

export default function Employees() {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/employees");
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submit = async () => {
    setError("");

    if (!form.employeeId || !form.fullName || !form.email) {
      setError("Employee ID, Full Name and Email are required");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await api.post("/api/employees", form);
      alert("Employee added successfully");

      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: ""
      });

      fetchEmployees();
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Employee with this ID already exists");
      } else {
        setError("Failed to add employee");
      }
    }
  };

  const deleteEmployee = async (employeeId) => {
    if (!window.confirm("Delete this employee?")) return;

    await api.delete(`/api/employees/${employeeId}`);
    fetchEmployees();
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "auto" }}>
      <h2>Employee Management</h2>

      <div style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "20px" }}>
        <h3>Add Employee</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ display: "grid", gap: "10px" }}>
          <input
            placeholder="Employee ID *"
            value={form.employeeId}
            onChange={e => setForm({ ...form, employeeId: e.target.value })}
          />

          <input
            placeholder="Full Name *"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            placeholder="Email *"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
          />

          <button onClick={submit}>Add Employee</button>
        </div>
      </div>

      <h3>Employee List</h3>

      {loading && <p>Loading...</p>}

      {!loading && employees.length === 0 && <p>No employees found</p>}

      {employees.length > 0 && (
        <table width="100%" border="2" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <thead style={{ background: "#f4f4f4" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    onClick={() => deleteEmployee(emp.employeeId)}
                    style={{ background: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
