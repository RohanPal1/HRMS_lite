export default function Navbar({ page, setPage }) {
    return (
        <div style={{
            display: "flex",
            gap: "20px",
            marginBottom: "25px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px"
        }}>
            <button onClick={() => setPage("employees")}>
                Employees
            </button>
            <button onClick={() => setPage("attendance")}>
                Attendance
            </button>
        </div>
    );
}
