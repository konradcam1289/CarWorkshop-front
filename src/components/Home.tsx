import React from "react";
import { useNavigate } from "react-router-dom";
import ServicesList from "./ServicesList";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "20px" }}>
            {/* Pasek nawigacyjny */}
            <nav style={navBarStyle}>
                <button style={navButtonStyle} onClick={() => navigate("/")}>Home</button>
                <button style={navButtonStyle} onClick={() => navigate("/services")}>O nas</button>
                <button style={navButtonStyle} onClick={() => navigate("/appointments")}>Oferta</button>
                <button style={navButtonStyle} onClick={() => navigate("/contact")}>Kontakt</button>
            </nav>

            <h1>🚗 Warsztat Samochodowy</h1>
            <p>
                Profesjonalne usługi naprawcze i serwisowe dla Twojego pojazdu.  
                Zadbaj o swoje auto razem z naszym zespołem ekspertów!
            </p>

            <h2>🔧 Nasze Usługi</h2>
            <p>Sprawdź, jakie usługi oferujemy i wybierz najlepszą dla siebie.</p>
            <ServicesList />

            

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => navigate("/login")} style={buttonStyle}>🔑 Zaloguj się</button>
                <button onClick={() => navigate("/register")} style={buttonStyle}>📝 Zarejestruj się</button>
            </div>
        </div>
    );
};

// Style dla przycisków nawigacyjnych
const navBarStyle: React.CSSProperties = {
    display: "flex",
    background: 'black',
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    padding: "10px",
    backgroundColor: "#333",
    borderRadius: "8px",
    marginBottom: "20px",
};

const navButtonStyle: React.CSSProperties = {
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    transition: "background-color 0.3s",
};

const buttonStyle: React.CSSProperties = {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
};



export default Home;
