import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseService from "../config/FirebaseConfig";

const GoogleLogin: React.FC = () => {
  const handleLogin = async () => {
    const auth = getAuth(firebaseService.getFirebaseApp());
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const email = result.user.email;

      console.log("Zalogowany użytkownik:", email);

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "ROLE_CLIENT");

      console.log("Pomyślnie zalogowano:", data);
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <button onClick={handleLogin}>Zaloguj przez Google</button>
  );
};

export default GoogleLogin;
