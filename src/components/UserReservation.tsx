import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserReservations: React.FC = () => {
    const [reservations, setReservations] = useState<any[]>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchReservations = async () => {
            if (!token) {
                alert("Błąd: Brak tokena. Zaloguj się ponownie.");
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/orders/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Błąd pobierania rezerwacji.");
                }

                const data = await response.json();
                console.log("📌 Rezerwacje pobrane z backendu:", data);
                setReservations(data);
            } catch (error) {
                console.error("❌ Błąd pobierania rezerwacji:", error);
            }
        };

        fetchReservations();
    }, [navigate]);

    const handleDeleteReservation = async (reservationId: string) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tę rezerwację?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/api/orders/${reservationId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Błąd podczas usuwania rezerwacji.");
            }

            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation.id !== reservationId)
            );

            alert("Rezerwacja została usunięta.");
        } catch (error) {
            console.error("❌ Błąd usuwania rezerwacji:", error);
            alert("Nie udało się usunąć rezerwacji.");
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>📅 Twoje Rezerwacje</h1>

            {reservations.length === 0 ? (
                <p style={noReservationsStyle}>Brak rezerwacji.</p>
            ) : (
                <ul style={listStyle}>
                    {reservations.map((order) => (
                        <li key={order.id} style={listItemStyle}>
                            <p><strong>🛠 Usługi:</strong> {order.services.map((service: any) => service.name).join(", ")}</p>
                            <p><strong>📆 Data wizyty:</strong> {new Date(order.appointmentDate).toLocaleString()}</p>
                            <p><strong>📌 Status:</strong> {order.status}</p>
                            <button 
                                onClick={() => handleDeleteReservation(order.id)} 
                                style={deleteButtonStyle}
                            >
                                ❌ Usuń rezerwację
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={() => navigate("/client/home")} style={backButtonStyle}>
                🔙 Powrót do panelu klienta
            </button>
        </div>
    );
};


const containerStyle: React.CSSProperties = {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif"
};

const headerStyle: React.CSSProperties = {
    color: "#333",
    marginBottom: "20px"
};

const noReservationsStyle: React.CSSProperties = {
    color: "#777",
    fontSize: "18px"
};

const listStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: "0"
};

const listItemStyle: React.CSSProperties = {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    marginBottom: "10px",
    borderRadius: "5px",
    textAlign: "left"
};

const deleteButtonStyle: React.CSSProperties = {
    marginTop: "10px",
    padding: "8px 15px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none"
};

const backButtonStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none"
};

export default UserReservations;
