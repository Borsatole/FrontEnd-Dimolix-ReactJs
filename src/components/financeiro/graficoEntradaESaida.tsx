import { BarChart, HighlightScope } from "@mui/x-charts";
import React from "react";

function GraficoEntradaESaida() {
  const dados = [
    { mes: "Janeiro", entrada: 24350, saida: 16000 },
    { mes: "Fevereiro", entrada: 35000, saida: 25000 },
    { mes: "Março", entrada: 5800, saida: 600 },
  ];
  const xLabels = dados.map((item) => item.mes);
  const entradaData = dados.map((item) => item.entrada);
  const saidaData = dados.map((item) => item.saida);

  const series = [
    { label: "Entradas", data: entradaData, highlightScope },
    { label: "Saídas", data: saidaData, highlightScope },
  ];

  return (
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
  );
}

export default GraficoEntradaESaida;

const highlightScope: HighlightScope = {
  highlight: "series",
  fade: "global",
};
