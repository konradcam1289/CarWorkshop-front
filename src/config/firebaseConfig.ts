import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDiHFrJEEJPzzDN4pMFqREGZ4Lm-3K0O34",
  authDomain: "workshopapp-74192.firebaseapp.com",
  projectId: "workshopapp-74192",
  storageBucket: "workshopapp-74192.appspot.com",
  messagingSenderId: "417631111779",
  appId: "1:417631111779:web:41777216babaf6bada0656",
  measurementId: "G-TGXHF7DK2K"
};

// Inicjalizacja Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Klasa Singleton dla Firebase
class FirebaseService {
  private static instance: FirebaseService;
  private app;
  private auth;

  private constructor() {
    this.app = firebaseApp;
    this.auth = getAuth(firebaseApp);
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  public getFirebaseApp() {
    return this.app;
  }

  public getAuthService() {
    return this.auth;
  }
}

export default FirebaseService.getInstance();
