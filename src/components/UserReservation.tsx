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

    return (
        <div>
            <h1>📅 Twoje Rezerwacje</h1>
            {reservations.length === 0 ? (
                <p>Brak rezerwacji.</p>
            ) : (
                <ul>
                    {reservations.map((order) => (
                        <li key={order.id}>
                            <p><strong>Usługi:</strong> {order.services.map((service: any) => service.name).join(", ")}</p>
                            <p><strong>Data wizyty:</strong> {new Date(order.appointmentDate).toLocaleString()}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserReservations;
