import { BarChart, HighlightScope } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { UseTabela } from "../comum/Tabelas/TabelaContext";
type dados = {
  mes: string;
  entrada: number;
  saida: number;
};

function GraficoEntradaESaida() {
  const [dados, setDados] = useState<dados[]>([]);

  const [periodo, setPeriodo] = useState(6);

  const { data } = UseTabela();

  useEffect(() => {
    if (data?.totalAnoSelecionado) {
      setDados(data.totalAnoSelecionado);
    }
  }, [data]);

  const xLabels = dados.map((item) => item.mes);
  const entradaData = dados.map((item) => item.entrada);
  const saidaData = dados.map((item) => item.saida);

  const series = [
    { label: "Entradas", data: entradaData, highlightScope },
    { label: "Saídas", data: saidaData, highlightScope },
  ];

  return (
    <>
      <BarChart
        height={300}
        colors={["green", "red"]}
        series={series}
        skipAnimation={false}
        xAxis={[
          {
            scaleType: "band",
            data: xLabels,
            labelStyle: { fill: "var(--text-color)" },
            tickLabelStyle: { fill: "var(--text-color)" },
          },
        ]}
        yAxis={[
          {
            position: "none",
            labelStyle: { fill: "var(--text-color)" },
            tickLabelStyle: { fill: "var(--text-color)" },
          },
        ]}
        sx={{
          "& .MuiChartsLegend-root": {
            color: "var(--text-color)",
            fontWeight: 600,
          },
        }}
      />
    </>
  );
}

export default GraficoEntradaESaida;

const highlightScope: HighlightScope = {
  highlight: "series",
  fade: "global",
};
