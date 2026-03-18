import { useContext, useEffect, useState, useRef } from "react";
import Alerta from "../comum/alertas";
import { AuthContext } from "@src/context/AuthContext";

function Timer() {
  const [percentual, setPercentual] = useState<number>(100);
  const [digits, setDigits] = useState<string[]>([
    "0",
    "0",
    ":",
    "0",
    "0",
    ":",
    "0",
    "0",
  ]);
  const [animatingDigits, setAnimatingDigits] = useState<boolean[]>(
    Array(8).fill(false),
  );
  const duracaoTotalRef = useRef<number | null>(null);
  const prevDigitsRef = useRef<string[]>([
    "0",
    "0",
    ":",
    "0",
    "0",
    ":",
    "0",
    "0",
  ]);
  const { logout } = useContext(AuthContext);

  const parseDigits = (h: string, m: string, s: string): string[] => [
    h[0],
    h[1],
    ":",
    m[0],
    m[1],
    ":",
    s[0],
    s[1],
  ];

  useEffect(() => {
    const calcularTempo = () => {
      const expLocalStorage = localStorage.getItem("expirationTime");
      if (!expLocalStorage)
        return {
          digits: parseDigits("00", "00", "00"),
          pct: 100,
          expirou: false,
        };

      const expirationTime = parseInt(expLocalStorage, 10);
      const agora = Math.floor(Date.now() / 1000);
      const diferenca = expirationTime - agora;

      if (diferenca <= 0)
        return { digits: parseDigits("00", "00", "00"), pct: 0, expirou: true };

      if (duracaoTotalRef.current === null) {
        duracaoTotalRef.current = diferenca;
      }

      const pct = Math.min(100, (diferenca / duracaoTotalRef.current) * 100);
      const horas = Math.floor(diferenca / 3600);
      const minutos = Math.floor((diferenca % 3600) / 60);
      const segundos = diferenca % 60;

      return {
        digits: parseDigits(
          String(horas).padStart(2, "0"),
          String(minutos).padStart(2, "0"),
          String(segundos).padStart(2, "0"),
        ),
        pct,
        expirou: false,
      };
    };

    const { digits: newDigits, pct } = calcularTempo();
    setPercentual(pct);
    setDigits(newDigits);
    prevDigitsRef.current = newDigits;

    const interval = setInterval(() => {
      const { digits: newD, pct: novoPct, expirou } = calcularTempo();
      const prev = prevDigitsRef.current;

      const changed = newD.map((d, i) => d !== prev[i]);
      setAnimatingDigits(changed);
      setTimeout(() => setAnimatingDigits(Array(8).fill(false)), 380);

      setPercentual(novoPct);
      setDigits(newD);
      prevDigitsRef.current = newD;

      if (expirou) {
        clearInterval(interval);
        Alerta("swal", "error", "Faça login novamente para continuar.");
        logout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const raio = 14;
  const circunferencia = 2 * Math.PI * raio;
  const offset = circunferencia * (1 - percentual / 100);

  const isCritico = percentual < 10;
  const isExpirando = percentual < 30;

  const corArco = isCritico
    ? "#ef4444"
    : isExpirando
      ? "#f97316"
      : "var(--corPrincipal)";

  // Labels abaixo de cada par de dígitos

  return (
    <div className=" p-2 h-10 text-sm bg-[var(--base-variant)] cursor-pointer flex items-center justify-center gap-2 rounded-full text-[var(--text-color)]">
      {/* Arco circular */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 36 36"
        className="shrink-0 -rotate-90"
      >
        <circle
          cx="18"
          cy="18"
          r={raio}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth="3.5"
        />
        <circle
          cx="18"
          cy="18"
          r={raio}
          fill="none"
          stroke={corArco}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.5s ease",
          }}
        />
      </svg>

      {/* Label */}
      <span className="hidden opacity-60 text-xs sm:block">Expira :</span>

      {/* Dígitos hh:mm:ss */}
      <div className=" flex items-center text-sm font-medium tracking-wider">
        {digits.map((d, i) => {
          if (d === ":") {
            return (
              <span key={i} className="mx-[2px] opacity-40 text-xs">
                :
              </span>
            );
          }

          // Índice do grupo (0=horas, 1=minutos, 2=segundos) — cada grupo tem 2 dígitos + 1 separador
          const groupIndex = i < 2 ? 0 : i < 5 ? 1 : 2;
          const isLastInGroup = i === 1 || i === 4 || i === 7;

          return (
            <span
              key={i}
              className="relative inline-flex flex-col items-center"
            >
              <span
                className="inline-block w-[10px] text-center overflow-hidden"
                style={{
                  animation: animatingDigits[i]
                    ? "rollUp 0.35s cubic-bezier(0.22,1,0.36,1) forwards"
                    : "none",
                }}
              >
                {d}
              </span>
              {/* Label tiny embaixo do segundo dígito de cada grupo */}
            </span>
          );
        })}
      </div>

      <style>{`
        @keyframes rollUp {
          0%   { transform: translateY(60%); opacity: 0; }
          100% { transform: translateY(0);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Timer;
