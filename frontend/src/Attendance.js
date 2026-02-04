import { useEffect, useState } from "react";
import { api } from "./api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [viewEmployeeId, setViewEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    api.get("/api/employees")
      .then(res => setEmployees(res.data))
      .catch(() => alert("Failed to fetch employees"));
  }, []);

  const markAttendance = async () => {
    if (!employeeId || !date) {
      alert("Select employee and date");
      return;
    }

    try {
      await api.post("/api/attendance", {
        employeeId,
        date,
        status
      });

      alert("Attendance marked successfully");
      fetchAttendance();
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Attendance already marked for this day");
      } else {
        alert("Failed to mark attendance");
      }
    }
  };

  const fetchAttendance = async () => {
    if (!viewEmployeeId) {
      alert("Select employee to view attendance");
      return;
    }

    setLoading(true);

    try {
      let url = `/api/attendance/${viewEmployeeId}`;

      if (startDate && endDate) {
        url += `?start_date=${startDate}&end_date=${endDate}`;
      }

      const res = await api.get(url);
      setRecords(res.data);
    } catch (err) {
      alert("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  const presentCount = records.filter(r => r.status === "Present").length;

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "auto" }}>
      <h2>Attendance Management</h2>

      <div style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "25px" }}>
        <h3>Mark Attendance</h3>

        <select value={employeeId} onChange={e => setEmployeeId(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.employeeId} value={emp.employeeId}>
              {emp.employeeId} - {emp.fullName}
            </option>
          ))}
        </select>

        <input
          type="date"
          onChange={e => setDate(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button onClick={markAttendance} style={{ marginLeft: "10px" }}>
          Mark
        </button>
      </div>

      <h3>View Attendance</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", alignItems: "center" }}>
        <select value={viewEmployeeId} onChange={e => setViewEmployeeId(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.employeeId} value={emp.employeeId}>
              {emp.employeeId} - {emp.fullName}
            </option>
          ))}
        </select>

        <input type="date" onChange={e => setStartDate(e.target.value)} />
        <input type="date" onChange={e => setEndDate(e.target.value)} />
        <button onClick={fetchAttendance}>View</button>
      </div>

      {records.length > 0 && (
        <p><strong>Total Present Days:</strong> {presentCount}</p>
      )}

      {loading && <p>Loading...</p>}

      {!loading && records.length === 0 && viewEmployeeId && (
        <p>No attendance records found</p>
      )}

      {records.length > 0 && (
        <table width="100%" border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <thead style={{ background: "#f4f4f4" }}>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.fullName || "-"}</td>
                <td>{r.date}</td>
                <td style={{
                  color: r.status === "Present" ? "green" : "red",
                  fontWeight: "bold"
                }}>
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Attendance;
