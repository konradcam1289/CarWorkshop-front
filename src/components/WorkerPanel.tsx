import React from "react";

const WorkerPanel: React.FC = () => {
    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>🔧 Panel Pracownika</h1>

            {/* Sekcja: Przegląd zgłoszonych zamówień */}
            <h2>📋 Zgłoszone zamówienia</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Klient</th>
                        <th>Usługa</th>
                        <th>Status</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>Jan Kowalski</td>
                        <td>Wymiana oleju</td>
                        <td>Oczekujące</td>
                        <td>
                            <button style={buttonStyle}>🔄 Aktualizuj status</button>
                        </td>
                    </tr>
                    <tr>
                        <td>002</td>
                        <td>Anna Nowak</td>
                        <td>Diagnostyka silnika</td>
                        <td>W trakcie</td>
                        <td>
                            <button style={buttonStyle}>🔄 Aktualizuj status</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Sekcja: Zarządzanie terminami */}
            <h2>📅 Zarządzanie terminami</h2>
            <label>Nowa dostępność:</label>
            <input type="date" style={inputStyle} />
            <button style={buttonStyle}>💾 Zapisz</button>

            {/* Sekcja: Aktualizacja statusu naprawy */}
            <h2>🔧 Aktualizacja statusu</h2>
            <select style={inputStyle}>
                <option value="oczekujące">Oczekujące</option>
                <option value="w_trakcie">W trakcie</option>
                <option value="zakończone">Zakończone</option>
            </select>
            <button style={buttonStyle}>✔️ Zmień status</button>

            {/* Sekcja: Komunikacja z klientem */}
            <h2>📩 Komunikacja z klientem</h2>
            <textarea placeholder="Wpisz wiadomość..." style={textareaStyle}></textarea>
            <button style={buttonStyle}>📤 Wyślij</button>
        </div>
    );
};

// 🔹 STYLE
const containerStyle: React.CSSProperties = {
    maxWidth: "900px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
};

const headerStyle: React.CSSProperties = {
    color: "#333",
    marginBottom: "20px",
};

const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
};

const inputStyle: React.CSSProperties = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    width: "100%",
};

const buttonStyle: React.CSSProperties = {
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    marginTop: "10px",
};

const textareaStyle: React.CSSProperties = {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "10px",
};

export default WorkerPanel;
