import React from "react";
import { LuUserRoundSearch } from "react-icons/lu";

function CliqueParaSelecionar({ onClick }: any) {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className="w-full rounded-lg border-2 border-dashed
                      bg-[var(--base-variant)] hover:bg-[var(--base-variant)] transition-all duration-200 py-8"
    >
      <div className="flex flex-col items-center gap-2">
        <LuUserRoundSearch size={32} />
        <span className="font-medium">Selecionar Cliente</span>
      </div>
    </button>
  );
}

export default CliqueParaSelecionar;
