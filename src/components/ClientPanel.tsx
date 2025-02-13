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

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h1>👤 Panel Klienta</h1>

            {error && <p style={{ color: "red" }}>❌ {error}</p>}

            <h2>📋 Dostępne Usługi</h2>
            {services.length === 0 && !error && <p>Ładowanie usług...</p>}
            {services.length > 0 && (
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>
                            {service.name} - {service.price} PLN
                            <br />
                            <select
                                onChange={(e) => handleAppointmentChange(service.id, e.target.value)}
                                value={selectedAppointments[service.id] || ""}
                            >
                                <option value="">-- Wybierz termin --</option>
                                {appointments.map((date) => (
                                    <option key={date.id} value={date.date}>{date.date}</option>
                                ))}
                            </select>
                            <button onClick={() => addToCart(service)}>Dodaj do koszyka</button>
                        </li>
                    ))}
                </ul>
            )}

            <h2>🛒 Koszyk</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>{item.name} - {item.price} PLN - {item.appointmentDate}</li>
                ))}
            </ul>

            {cart.length > 0 && (
                <button onClick={proceedToPayment} style={buttonStyle}>
                    Przejdź do płatności
                </button>
            )}
        </div>
    );
};

const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#FFA500",
    color: "white",
    border: "none",
};

export default ClientPanel;
