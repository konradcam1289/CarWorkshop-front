import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import servicesService from "../services/servicesService";
import appointmentService from "../services/appointmentService";

const ClientPanel: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [selectedAppointments, setSelectedAppointments] = useState<{ [key: number]: string }>({});
    const [cart, setCart] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("❌ Brak tokena! Przekierowanie do logowania.");
                    navigate("/login");
                    return;
                }

                const data = await servicesService.getServices();
                console.log("📌 Usługi pobrane z backendu:", data);
                setServices(data);
            } catch (error: any) {
                console.error("❌ Błąd podczas pobierania usług:", error);
                setError("Wystąpił błąd podczas pobierania usług.");
            }
        };

        const fetchAppointments = async () => {
            try {
                const data = await appointmentService.getAvailableDates();
                console.log("📌 Terminy pobrane:", data);
                setAppointments(data);
            } catch (error: any) {
                console.error("❌ Błąd podczas pobierania terminów:", error);
            }
        };

        fetchServices();
        fetchAppointments();
    }, [navigate]);

    const handleAppointmentChange = (serviceId: number, date: string) => {
        setSelectedAppointments(prev => ({
            ...prev,
            [serviceId]: date
        }));
    };

    const addToCart = (service: any) => {
        if (!selectedAppointments[service.id]) {
            alert("Proszę wybrać termin przed dodaniem do koszyka!");
            return;
        }

        const selectedDate = selectedAppointments[service.id];
        setCart([...cart, { ...service, appointmentDate: selectedDate }]);
    };

    const proceedToPayment = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/payment");
    };

    const goToReservations = () => {
        navigate("/client/reservations");
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>👤 Panel Klienta</h1>

            {error && <p style={{ color: "red", fontWeight: "bold" }}>❌ {error}</p>}

            <h2 style={subHeaderStyle}>📋 Dostępne Usługi</h2>
            {services.length === 0 && !error && <p>Ładowanie usług...</p>}
            {services.length > 0 && (
                <ul style={listStyle}>
                    {services.map((service) => (
                        <li key={service.id} style={listItemStyle}>
                            <strong>{service.name}</strong> - {service.price} PLN
                            <br />
                            <select
                                onChange={(e) => handleAppointmentChange(service.id, e.target.value)}
                                value={selectedAppointments[service.id] || ""}
                                style={selectStyle}
                            >
                                <option value="">-- Wybierz termin --</option>
                                {appointments.map((date) => (
                                    <option key={date.id} value={date.date}>{date.date}</option>
                                ))}
                            </select>
                            <button onClick={() => addToCart(service)} style={buttonStyle}>
                                Dodaj do koszyka
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <h2 style={subHeaderStyle}>🛒 Koszyk</h2>
            <ul style={listStyle}>
                {cart.map((item, index) => (
                    <li key={index} style={listItemStyle}>
                        {item.name} - {item.price} PLN - <strong>{item.appointmentDate}</strong>
                    </li>
                ))}
            </ul>

            {cart.length > 0 && (
                <button onClick={proceedToPayment} style={paymentButtonStyle}>
                    Przejdź do płatności
                </button>
            )}

            <button onClick={goToReservations} style={reservationButtonStyle}>
                📅 Moje rezerwacje
            </button>
        </div>
    );
};

// STYLE
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

const subHeaderStyle: React.CSSProperties = {
    color: "#555",
    marginBottom: "15px"
};

const listStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: "0"
};

const listItemStyle: React.CSSProperties = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left"
};

const selectStyle: React.CSSProperties = {
    margin: "10px",
    padding: "5px",
    borderRadius: "5px"
};

const buttonStyle: React.CSSProperties = {
    padding: "10px 15px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    marginLeft: "10px"
};

const paymentButtonStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "white",
    border: "none"
};

const reservationButtonStyle: React.CSSProperties = {
    marginTop: "15px",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#ffc107",
    color: "black",
    border: "none"
};

export default ClientPanel;
