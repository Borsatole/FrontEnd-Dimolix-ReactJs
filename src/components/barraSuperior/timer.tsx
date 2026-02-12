import { Read } from "@src/services/crud2";
import { useContext, useEffect, useState } from "react";
import Alerta from "../comum/alertas";
import { AuthContext } from "@src/context/AuthContext";

function Timer() {
  const [tempoRestante, setTempoRestante] = useState<string>("");
  const { logout, auth } = useContext(AuthContext);

  useEffect(() => {
    const calcularTempo = () => {
      const expLocalStorage = localStorage.getItem("expirationTime");
      if (!expLocalStorage) return "00:00";

      const expirationTime = parseInt(expLocalStorage, 10);
      const agora = Math.floor(Date.now() / 1000);
      const diferenca = expirationTime - agora;

      if (diferenca <= 0) {
        return "Sessão expirada";
      }

      const minutos = Math.floor(diferenca / 60);
      const segundos = diferenca % 60;
      return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    };

    // Atualiza o timer imediatamente ao montar
    setTempoRestante(calcularTempo());

    const interval = setInterval(() => {
      const novoTempo = calcularTempo();
      setTempoRestante(novoTempo);

      if (novoTempo === "Sessão expirada") {
        clearInterval(interval);

        Alerta("swal", "error", "Faça login novamente para continuar.");
        // logout();
        // window.location.href = "/";
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="p-2 h-10 text-sm bg-[var(--base-variant)] cursor-pointer
      flex items-center justify-center rounded-full text-[var(--text-color)]"
    >
      {tempoRestante ? `Sessão : ${tempoRestante}` : "Sessão : 00:00"}
    </div>
  );
}

export default Timer;
