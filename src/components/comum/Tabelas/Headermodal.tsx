import { getIcon } from "@src/components/icons";
import React from "react";

function Headermodal({ icone, titulo, subtitulo }: any) {
  return (
    <div className="flex flex-col p-4 border-b border-[var(--base-color)] mb-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg bg-[var(--base-color)] flex items-center justify-center shadow-inner text-[var(--corPrincipal)]">
          {getIcon(`${icone || ""}`, 48)}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-color)]">
            {titulo || ""}
          </h2>
          <p className="text-sm text-[var(--text-color)]/70">
            {subtitulo || ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Headermodal;
