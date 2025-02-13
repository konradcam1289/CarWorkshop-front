import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment: React.FC = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    useEffect(() => {
        if (!username) {
            fetchUsername();
        }
    }, []);

    const fetchUsername = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Brak tokena. Zaloguj się ponownie.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/user", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                localStorage.setItem("username", data.username);
            } else {
                throw new Error("Nie udało się pobrać nazwy użytkownika.");
            }
        } catch (error) {
            navigate("/login");
        }
    };

    const handlePayment = async () => {
        if (cart.length === 0) {
            alert("Twój koszyk jest pusty!");
            return;
        }

        if (!username) {
            alert("Błąd: Brak nazwy użytkownika. Zaloguj się ponownie.");
            return;
        }

        const serviceIds = cart.map((item: any) => item.id);
        const appointmentDate = new Date(cart[0]?.appointmentDate).toISOString();

        const orderData = {
            username,
            serviceIds,
            appointmentDate,
            paymentMethod,
            status: paymentMethod === "cash" ? "CONFIRMED" : "PENDING",
        };

        try {
            const response = await fetch("http://localhost:8080/api/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            if (paymentMethod === "online") {
                window.location.href = "https://secure.payu.com/pay";
            } else {
                alert("Twoja rezerwacja została dokonana! Opłać na miejscu.");
                localStorage.removeItem("cart");
                navigate("/client/reservations");
            }
        } catch (error) {
            alert("Nie udało się przetworzyć płatności.");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", padding: "20px" }}>
            <h1>💳 Wybór Metody Płatności</h1>
            <div>
                <label>
                    <input
                        type="radio"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                    />
                    Płatność Online (PayU)
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                    />
                    Płatność na Miejscu
                </label>
            </div>
            <button onClick={handlePayment} style={buttonStyle}>
                Potwierdź płatność
            </button>
        </div>
    );
};

const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
};

export default Payment;
