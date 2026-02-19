import { useState } from "react";

export default function CardOrders({
  titulo,
  valor,
  cor,
  corRodape,
  corRodapeHover,
  icone,
  className,
  onClick,
}: any) {
  const [bg, setBg] = useState(corRodape);
  return (
    <div className={`${className} w-full rounded-md overflow-hidden shadow-md`}>
      {/* Topo */}
      <div
        className={`p-4 flex justify-between items-start relative`}
        style={{ backgroundColor: cor || "var(--corPrincipal)" }}
      >
        {/* Texto alinhado à esquerda */}
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white">{valor}</span>
          <span className="text-white text-sm mt-1">{titulo}</span>
        </div>

        {/* Ícone à direita */}
        {icone && icone}
        {/* <FaShoppingBag className="text-white/50 text-5xl" /> */}
      </div>

      {/* Rodapé */}
      <div
        onClick={onClick || (() => {})}
        className="p-2 text-left text-white flex items-center gap-1 cursor-pointer transition"
        style={{ backgroundColor: corRodapeHover || corRodape }}
      >
        Mais Informações
        <span className="ml-1">➜</span>
      </div>
    </div>
  );
}
