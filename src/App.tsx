import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Rotas from "./routes";
import { MenuProvider } from "./context/MenuContext";
import { ClientesProvider } from "./context/ClientesContext";
import { AppProviders } from "./context/Providers";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AppProviders>
        <Rotas />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
