import React from "react";
import dayjs from "dayjs";

interface DiasSemanaCardsProps {
  dias: { data: dayjs.Dayjs; dia: number; mes: number; ano: number; diaSemana: string; dataFormatada: string }[];
  selecionado: { data: dayjs.Dayjs; dia: number; mes: number; ano: number; diaSemana: string; dataFormatada: string };
  setSelecionado: (dia: { data: dayjs.Dayjs; dia: number; mes: number; ano: number; diaSemana: string; dataFormatada: string }) => void;
}

export default function DiasSemanaCards({ dias, selecionado, setSelecionado }: DiasSemanaCardsProps) {
   

        return (
    <div className="flex gap-3 overflow-x-scroll py-3 px-1 w-full"
      style={{
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
  >
      {dias.map((d, i) => {
        const isSelecionado = d.data.isSame(selecionado.data, 'day');
        const isHoje = d.data.isSame(dayjs(), 'day');

        return (
          <div
            key={i}
            onClick={() => setSelecionado(d)}
            className={`cursor-pointer flex-1 min-w-[80px] h-40 flex flex-col items-center justify-center rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 border-[var(--base-color)]
              ${isSelecionado 
                ? " bg-[var(--corPrincipal)]" 
                : isHoje
                ? "bg-[var(--corPrincipal)/50] border-2 border-[var(--corPrincipal)]"
                : "bg-[var(--base-variant)] border  hover:border-[var(--corPrincipal)]"
              }`}
          >
            <span className={`font-bold text-2xl mb-1`}>
              {d.dia}
            </span>
            <span className={`text-xs uppercase tracking-wide `}>
              {d.diaSemana.substring(0, 3)}
            </span>
            {isHoje && !isSelecionado && (
              <span className="text-[10px] mt-1 text-[var(--corPrincipal)] font-semibold">Hoje</span>
            )}
          </div>
        );
      })}
    </div>
  );
    
}
