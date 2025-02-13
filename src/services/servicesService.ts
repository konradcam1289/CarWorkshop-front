const API_URL = "http://localhost:8080/services";

const servicesService = {
    getServices: async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("❌ Brak tokena! Użytkownik może nie być zalogowany.");
                throw new Error("Brak tokena. Zaloguj się ponownie.");
            }

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.error("❌ Błąd 401: Nieautoryzowany dostęp.");
                    throw new Error("Nieautoryzowany dostęp. Zaloguj się ponownie.");
                } else if (response.status === 403) {
                    console.error("❌ Błąd 403: Brak uprawnień.");
                    throw new Error("Brak uprawnień do pobrania usług.");
                } else {
                    console.error(`❌ Błąd pobierania usług: ${response.status}`);
                    throw new Error(`Błąd pobierania usług: ${response.status}`);
                }
            }

            return await response.json();
        } catch (error: any) {
            console.error("❌ Błąd pobierania usług:", error.message);
            throw new Error(error.message || "Wystąpił nieznany błąd.");
        }
    }
};

export default servicesService;
