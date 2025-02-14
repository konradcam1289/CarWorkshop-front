import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        roles: ["CLIENT"],
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Rejestracja zakończona sukcesem!");
            navigate("/login");
        } catch (error) {
            alert("Błąd rejestracji!");
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>📝 Rejestracja</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input type="text" name="username" placeholder="👤 Nazwa użytkownika" onChange={handleChange} required style={inputStyle} />
                <input type="email" name="email" placeholder="📧 Email" onChange={handleChange} required style={inputStyle} />
                <input type="password" name="password" placeholder="🔑 Hasło" onChange={handleChange} required style={inputStyle} />
                <input type="text" name="firstName" placeholder="📛 Imię" onChange={handleChange} required style={inputStyle} />
                <input type="text" name="lastName" placeholder="📛 Nazwisko" onChange={handleChange} required style={inputStyle} />
                <input type="text" name="phoneNumber" placeholder="📞 Telefon" onChange={handleChange} required style={inputStyle} />
                <input type="text" name="address" placeholder="📍 Adres" onChange={handleChange} required style={inputStyle} />
                <button type="submit" style={buttonStyle}>✅ Zarejestruj się</button>
            </form>
        </div>
    );
};

const containerStyle: React.CSSProperties = {
    maxWidth: "400px",
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

const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
};

const inputStyle: React.CSSProperties = {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "border-color 0.2s",
};

const buttonStyle: React.CSSProperties = {
    marginTop: "10px",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    transition: "background-color 0.3s",
};

export default Register;
