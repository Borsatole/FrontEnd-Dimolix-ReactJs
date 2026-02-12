import React from "react";

type FiltroStatus = "todos" | "locado" | "disponivel";

interface OpcaoVisualizacaoProps {
  setFiltroStatus: React.Dispatch<React.SetStateAction<FiltroStatus>>;
  filtroStatus: FiltroStatus;
  totais: {
    total: number;
    locados: number;
    disponiveis: number;
  };
}

function OpcaoVisualizacao({
  totais,
  filtroStatus,
  setFiltroStatus,
}: OpcaoVisualizacaoProps) {
  const filtros = [
    { id: "todos" as const, label: "Todos", count: totais.total },
    { id: "locado" as const, label: "Locados", count: totais.locados },
    {
      id: "disponivel" as const,
      label: "Disponíveis",
      count: totais.disponiveis,
    },
  ];

  return (
    <div className="relative mb-6 rounded-xl overflow-hidden border border-[var(--base-color)] shadow-sm">
      {/* Background com gradiente e imagem */}
      <div
        className="absolute inset-0 bg-cover bg-right opacity-80 "
        style={{
          backgroundImage: "url('imagem1.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--corPrincipal), rgba(255, 255, 255, 0.5))",
        }}
      />

      {/* Conteúdo */}
      <div className="relative flex items-center justify-between p-20 flex-col">
        <div className="flex flex-col md:flex-row gap-2">
          {filtros.map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroStatus(filtro.id)}
              className={`
                px-10 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer
                ${
                  filtroStatus === filtro.id
                    ? "bg-white text-gray-800 shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
                }
              `}
            >
              {filtro.label}
              <span
                className={`
                  ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold
                  ${
                    filtroStatus === filtro.id
                      ? "bg-[var(--corPrincipal)] text-white"
                      : "bg-gray-200 text-gray-600"
                  }
                `}
              >
                {filtro.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OpcaoVisualizacao;
