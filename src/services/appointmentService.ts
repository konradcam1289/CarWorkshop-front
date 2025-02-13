const API_URL = "http://localhost:8080/api/appointments/available";

const appointmentService = {
    getAvailableDates: async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("❌ Brak tokena! Użytkownik może nie być zalogowany.");
            throw new Error("Brak tokena.");
        }

        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.error(`❌ Błąd pobierania terminów: ${response.status}`);
                const errorMessage = await response.text();
                throw new Error(`Błąd pobierania terminów: ${response.status} - ${errorMessage}`);
            }

            const data = await response.json();
            console.log("📌 Terminy pobrane z backendu:", data);
            return data;
        } catch (error) {
            console.error("❌ Wystąpił błąd podczas pobierania terminów:", error);
            throw error;
        }
    }
};

export default appointmentService;
