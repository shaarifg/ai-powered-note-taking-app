import "./App.css";
import AppRouter from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      )}
    </>
  );
  // return (
  //   <AuthProvider>
  //     <AppRouter />
  //   </AuthProvider>
  // );
}

export default App;
