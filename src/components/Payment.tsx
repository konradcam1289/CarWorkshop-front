import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment: React.FC = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("online");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const handlePayment = async () => {
        if (cart.length === 0) {
            alert("Twój koszyk jest pusty!");
            return;
        }

        const orderData = {
            username: localStorage.getItem("username"), // Pobranie użytkownika
            serviceIds: cart.map((item: any) => item.id),
            appointmentDate: localStorage.getItem("appointmentDate"),
            paymentMethod: paymentMethod,
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

            if (!response.ok) throw new Error("Błąd podczas przetwarzania płatności.");

            if (paymentMethod === "online") {
                // Przekierowanie do zewnętrznego systemu płatności np. PayU
                window.location.href = "https://secure.payu.com/pay"; // 🔹 To trzeba zmienić na URL rzeczywistej płatności
            } else {
                alert("Twoje zamówienie zostało złożone! Opłać na miejscu.");
                localStorage.removeItem("cart"); // Wyczyść koszyk
                navigate("/client/home"); // Powrót do panelu klienta
            }
        } catch (error) {
            console.error("Błąd płatności:", error);
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
