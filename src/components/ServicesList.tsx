import React, { useEffect, useState } from "react";
import servicesService from "../services/servicesService";

const ServicesList: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const data = await servicesService.getServices();

                if (!Array.isArray(data) || data.length === 0) {
                    setError("Brak dostępnych usług.");
                    setServices([]);
                } else {
                    console.log("📌 Usługi pobrane z backendu:", data);
                    setServices(data);
                }
            } catch (err) {
                console.error("❌ Błąd pobierania usług:", err);
                setError("Nie udało się pobrać usług. Spróbuj ponownie później.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div style={containerStyle}>
            <h2>🔧 Lista usług</h2>

            {loading && <p style={loadingStyle}>⏳ Ładowanie usług...</p>}
            {error && <p style={errorStyle}>{error}</p>}

            {!loading && !error && services.length > 0 && (
                <ul style={listStyle}>
                    {services.map(service => (
                        <li key={service.id} style={listItemStyle}>
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                            <p><strong>Cena: {service.price} zł</strong></p>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && !error && services.length === 0 && <p>⚠ Brak dostępnych usług.</p>}
        </div>
    );
};

const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const listStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: 0,
};

const listItemStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    textAlign: "left",
    backgroundColor: "#f9f9f9",
};

const loadingStyle: React.CSSProperties = {
    fontSize: "18px",
    color: "#007BFF",
};

const errorStyle: React.CSSProperties = {
    fontSize: "16px",
    color: "red",
};

export default ServicesList;
