import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
    
            if (!data || !data.token || !data.role || !data.username) {
                setErrorMessage("Błędna odpowiedź serwera.");
                return;
            }
    
            const token = data.token;
            const role = data.role;
            const loggedInUsername = data.username; // Pobieramy username z odpowiedzi
    
            console.log("DEBUG: Otrzymana rola użytkownika ->", role);
    
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("username", loggedInUsername); // 🆕 ✅ Zapisywanie `username`
    
            switch (role) {
                case "ROLE_ADMIN":
                    navigate("/admin/home");
                    break;
                case "ROLE_WORKER":
                    navigate("/worker/home");
                    break;
                case "ROLE_CLIENT":
                    navigate("/client/home");
                    break;
                default:
                    setErrorMessage(`Nieznana rola użytkownika: ${role}`);
            }
        } catch (error) {
            setErrorMessage("Nie udało się zalogować. Sprawdź login i hasło.");
        }
    };
    

    return (
        <div>
            <h2>Logowanie</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <input type="text" placeholder="Login" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Zaloguj</button>
        </div>
    );
};

export default Login;
