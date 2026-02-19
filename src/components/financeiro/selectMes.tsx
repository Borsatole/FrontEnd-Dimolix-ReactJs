import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function SelectMesAno({ onChange }: any) {
  const [dataAtual, setDataAtual] = useState(dayjs());

  useEffect(() => {
    onChange?.({
      mes: dataAtual.format("MM"),
      ano: dataAtual.format("YYYY"),
    });
  }, [dataAtual]);

  const voltarMes = () => setDataAtual((prev) => prev.subtract(1, "month"));
  const avancarMes = () => setDataAtual((prev) => prev.add(1, "month"));
  const voltarAno = () => setDataAtual((prev) => prev.subtract(1, "year"));
  const avancarAno = () => setDataAtual((prev) => prev.add(1, "year"));

  return (
    <div className="flex text-lg flex-col mt-6 rounded p-4">
      <div className="flex items-center justify-between">
        {/* MÊS */}
        <div className="flex items-center gap-3">
          <button
            onClick={voltarMes}
            className="bg-[var(--corPrincipal)] cursor-pointer rounded-full px-2 py-1 transition-all hover:bg-[var(--corPrincipal)]/80"
          >
            <SlArrowLeft />
          </button>

          <span className="font-medium min-w-[90px] text-center">
            {meses[dataAtual.month()]}
          </span>

          <button
            onClick={avancarMes}
            className="bg-[var(--corPrincipal)] cursor-pointer rounded-full px-2 py-1 transition-all hover:bg-[var(--corPrincipal)]/80"
          >
            <SlArrowRight />
          </button>
        </div>

        {/* ANO */}
        <div className="flex items-center gap-3">
          <button
            onClick={voltarAno}
            className="bg-[var(--corPrincipal)] cursor-pointer rounded-full px-2 py-1 transition-all hover:bg-[var(--corPrincipal)]/80"
          >
            <SlArrowLeft />
          </button>

          <span className="font-medium">{dataAtual.year()}</span>

          <button
            onClick={avancarAno}
            className="bg-[var(--corPrincipal)] cursor-pointer rounded-full px-2 py-1 transition-all hover:bg-[var(--corPrincipal)]/80"
          >
            <SlArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectMesAno;
