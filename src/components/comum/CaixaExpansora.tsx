import { useEffect, useState } from "react";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiOutlineFolder } from "react-icons/ai";
import { getIcon } from "../icons";

interface FiltroContainerProps {
  icon?: string;
  titulo: string;
  subtitulo?: string;
  contador?: number;
  children: React.ReactNode;
  defaultExpandido?: boolean;
}

export function CaixaExpansora({
  icon = "filter",
  titulo,
  subtitulo,
  contador = 0,
  children,
  defaultExpandido = true,
}: FiltroContainerProps) {
  const [expandido, setExpandido] = useState(defaultExpandido);

  useEffect(() => {
    setExpandido(defaultExpandido);
  }, [defaultExpandido]);

  return (
    <div className="bg-[var(--base-variant)] rounded-2xl shadow-lg border border-[var(--base-color)] overflow-hidden mb-6 transition-all duration-300 p-3">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--base-color)]/30 transition-colors duration-200"
        onClick={() => setExpandido(!expandido)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--corPrincipal)]/10 text-[var(--corPrincipal)]">
            {getIcon(icon, 18, "text-[var(--corPrincipal)]")}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)]">
              {titulo}
            </h3>

            {subtitulo && (
              <span className="text-xs text-[var(--text-color)]/80">
                {subtitulo}
              </span>
            )}

            {contador > 0 && (
              <span className="text-xs text-[var(--text-color)]/60">
                {contador} filtro{contador > 1 ? "s" : ""} ativo
                {contador > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {contador > 0 && (
            <span className="px-3 py-1 bg-[var(--corPrincipal)] text-white text-xs font-medium rounded-full">
              {contador}
            </span>
          )}

          <button
            type="button"
            className="p-2 rounded-lg hover:bg-[var(--base-color)] transition-colors duration-200 cursor-pointer"
          >
            {expandido ? (
              <FaChevronUp className="text-[var(--text-color)]/70" />
            ) : (
              <FaChevronDown className="text-[var(--text-color)]/70" />
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          expandido ? "opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
