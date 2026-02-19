import { useEffect, useState } from "react";
import { FaCloudArrowDown } from "react-icons/fa6";
import LoadingSpiner from "@src/components/loader/LoadingSpiner";
import { useVelocidadeReal } from "@src/hooks/useVelocidadeConexao";
import Alerta from "../comum/alertas";

function AtualizarButton() {
  const { mbps, medindo, medir } = useVelocidadeReal();

  const velocidades = [
    { limite: 5, qualidade: "Ruim" },
    { limite: 15, qualidade: "Regular" },
    { limite: 100, qualidade: "Bom" },
    { limite: Infinity, qualidade: "Excelente" },
  ];

  const [atualizando, setAtualizando] = useState(false);
  const [velocidade, setVelocidade] = useState<number | null>(null);
  const [qualidade, setQualidade] = useState<string | null>(null);

  useEffect(() => {
    setVelocidade(mbps);
  }, [mbps]);

  useEffect(() => {
    if (velocidade !== null) {
      const { qualidade } = velocidades.find((v) => velocidade <= v.limite)!;
      setQualidade(qualidade);

      Alerta(
        "swal",
        "success",
        `Velocidade de conexão: ${qualidade} (${velocidade} Mbps)`,
      );
    }
  }, [velocidade]);

  function handleClick() {
    setAtualizando(true);

    setTimeout(() => {
      medir();
      setAtualizando(false);
    }, 1000);
  }

  return (
    <div
      className="w-10 h-10 bg-[var(--base-variant)] cursor-pointer
      flex items-center justify-center rounded-full text-[var(--text-color)]"
      onClick={handleClick}
    >
      <LoadingSpiner loading={atualizando}>
        <FaCloudArrowDown size={20} aria-disabled={atualizando} />
      </LoadingSpiner>
    </div>
  );
}

export default AtualizarButton;
