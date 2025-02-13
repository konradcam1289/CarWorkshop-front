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
        roles: ["CLIENT"], // Domyślna rola nowego użytkownika
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
        <div>
            <h2>Rejestracja</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Nazwa użytkownika" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Hasło" onChange={handleChange} required />
                <input type="text" name="firstName" placeholder="Imię" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Nazwisko" onChange={handleChange} required />
                <input type="text" name="phoneNumber" placeholder="Telefon" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Adres" onChange={handleChange} required />
                <button type="submit">Zarejestruj się</button>
            </form>
        </div>
    );
};

export default Register;
