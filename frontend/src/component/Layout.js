export default function Layout({ children }) {
    return (
        <div style={{
            fontFamily: "Arial, sans-serif",
            background: "#f8f9fa",
            minHeight: "100vh"
        }}>
            <div style={{
                maxWidth: "1100px",
                margin: "auto",
                padding: "20px"
            }}>
                {children}
            </div>
        </div>
    );
}
