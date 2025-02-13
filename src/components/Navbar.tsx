import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout, getRole } from "../services/authService";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!getToken();
    const role = getRole();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav>
            <Link to="/">Strona Główna</Link>
            {isAuthenticated ? (
                <>
                    {role === "ADMIN" && <Link to="/admin">Panel Admina</Link>}
                    {role === "WORKER" && <Link to="/worker">Panel Pracownika</Link>}
                    {role === "CLIENT" && <Link to="/client">Moje Konto</Link>}
                    <button onClick={handleLogout}>Wyloguj</button>
                </>
            ) : (
                <>
                    <Link to="/login">Logowanie</Link>
                    <Link to="/register">Rejestracja</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
