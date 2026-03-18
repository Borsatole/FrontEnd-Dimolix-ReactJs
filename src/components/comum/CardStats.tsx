import { useState } from "react";

/* ── helpers ─────────────────────────────────────────────────── */
function shadeColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/* ── tipos ───────────────────────────────────────────────────── */
interface CardOrdersProps {
  titulo: string;
  valor: string | number;
  cor?: string;
  textoRodape?: string;
  corRodape?: string;
  corRodapeHover?: string;
  icone?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/* ── componente ──────────────────────────────────────────────── */
export default function CardOrders({
  titulo,
  valor,
  cor,
  textoRodape,
  corRodape,
  corRodapeHover,
  icone,
  className = "",
  onClick,
}: CardOrdersProps) {
  const [hovered, setHovered] = useState(false);

  const bgMain = cor || "var(--corPrincipal)";
  const bgFoot = corRodape || "var(--corPrincipal)";
  const bgHover =
    corRodapeHover ||
    (corRodape ? shadeColor(corRodape, -15) : "var(--corPrincipal)");

  return (
    <div
      className={`${className} grid grid-cols-1 relative w-full rounded-2xl overflow-hidden z-1`}
      style={{
        boxShadow: `0 8px 28px ${bgMain}40, 0 2px 6px rgba(0,0,0,.15)`,
      }}
    >
      {/* ── topo ──────────────────────────────────────────── */}
      <div
        className="relative px-5 pt-5 pb-6 flex justify-between items-start overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${bgMain} 0%, ${
            bgMain.startsWith("#") ? shadeColor(bgMain, -20) : bgMain
          } 100%)`,
        }}
      >
        {/* decoração geométrica de fundo */}

        <svg
          className="absolute right-0 top-0 opacity-10 pointer-events-none select-none"
          width="120"
          height="100"
          viewBox="0 0 120 100"
          aria-hidden="true"
        >
          <circle cx="100" cy="10" r="60" fill="white" />
          <circle cx="110" cy="80" r="40" fill="white" />
        </svg>

        {/* textos */}
        <div className="z-10 flex flex-col gap-1">
          <span className="text-left text-2xl sm:text-3xl font-black text-white leading-none tracking-tight">
            {valor}
          </span>
          <span className="text-white/70 text-xs font-medium uppercase tracking-widest mt-1">
            {titulo}
          </span>
        </div>

        {/* ícone */}
        {icone && (
          <div
            className="z-10 flex items-center justify-center w-11 h-11 rounded-xl text-white text-2xl"
            style={{
              background: "rgba(255,255,255,.18)",
              backdropFilter: "blur(6px)",
            }}
          >
            {icone}
          </div>
        )}
      </div>

      {/* ── rodapé ────────────────────────────────────────── */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full flex items-center justify-between px-5 py-3 text-white/90 text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all duration-200"
        style={{
          background: hovered ? bgHover : bgFoot,
          borderTop: "1px solid rgba(255,255,255,.1)",
        }}
      >
        <span>{textoRodape || ""}</span>
        <span
          className="transition-transform duration-200"
          style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}
        >
          →
        </span>
      </button>
    </div>
  );
}
