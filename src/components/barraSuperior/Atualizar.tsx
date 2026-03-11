import { useState } from "react";
import { GrRefresh } from "react-icons/gr";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";

function AtualizarButton() {
  const { refresh } = UseTabela();
  const [loading, setLoading] = useState(false);

  function atualizar() {
    refresh?.();
  }

  function animacao() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      atualizar();
    }, 2000);
  }

  return (
    <button
      type="button"
      onClick={animacao}
      disabled={loading}
      className={`
        cursor-pointer
        w-10 h-10
        bg-[var(--base-variant)]
        flex items-center justify-center
        rounded-full
        text-[var(--text-color)]
        hover:scale-105
        active:scale-95
        transition
        disabled:opacity-60`}
    >
      <GrRefresh size={18} className={loading ? "animate-spin" : ""} />
    </button>
  );
}

export default AtualizarButton;
