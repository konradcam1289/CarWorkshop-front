import React from "react";

const AdminPanel: React.FC = () => {
    return (
        <div style={{
            width: "100%",
            maxWidth: "800px",
            margin: "50px auto",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            fontFamily: "Arial, sans-serif"
        }}>
            <h1 style={{ color: "#333", marginBottom: "20px" }}>Panel Administratora</h1>

            <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
                Witaj w panelu administratora! Wybierz, którą sekcją chcesz zarządzać.
            </p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                justifyContent: "center",
                marginBottom: "20px"
            }}>
                <button style={{
                    padding: "15px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                }}>
                    Zarządzanie użytkownikami
                </button>

                <button style={{
                    padding: "15px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                }}>
                    Zarządzanie usługami
                </button>

                <button style={{
                    padding: "15px",
                    backgroundColor: "#ffc107",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                }}>
                    Zarządzanie rezerwacjami
                </button>

                <button style={{
                    padding: "15px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                }}>
                    Przegląd statystyk
                </button>
            </div>

            <p style={{ fontSize: "14px", color: "#777" }}>
                Wybierz jedną z dostępnych opcji, aby rozpocząć zarządzanie danymi.
            </p>
        </div>
    );
};

export default AdminPanel;
