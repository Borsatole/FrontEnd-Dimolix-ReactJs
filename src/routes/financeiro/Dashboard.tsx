import ContainerSecundario from "@src/components/comum/containerSecundario";
import CardOrders from "@src/components/comum/CardStats";
import GraficoEntradaESaida from "@src/components/financeiro/graficoEntradaESaida";
import SelectMesAno from "@src/components/financeiro/selectMes";
import Tabela from "@src/components/financeiro/Tabela";
import { useFinanceiro } from "@src/context/FinanceiroContext";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";

type Registro = {
  id: number;
  tipo: "entrada" | "saida";
  categoria: string;
  valor: number;
  pago: boolean;
  data: string;
};

function Dashboard() {
  const [mesSelecionado, setMesSelecionado] = useState<number | null>(null);
  const [anoSelecionado, setAnoSelecionado] = useState<number | null>(null);
  const [visualizacaoMeses, setVisualizacaoMeses] = useState(3);

  const {
    registros,
    setRegistros,
    relistar,
    setRelistar,
    loadingSpiner,
    setLoadingSpiner,
    selectedRegistro,
    setSelectedRegistro,
    abrirModalNovoRegistro,
    setAbrirModalNovoRegistro,
    abrirModalEditarRegistro,
    setAbrirModalEditarRegistro,
  } = useFinanceiro();

  const handlePeriodo = ({ mes, ano }: { mes: number; ano: number }) => {
    setMesSelecionado(Number(mes));
    setAnoSelecionado(Number(ano));
  };

  return (
    <ContainerSecundario className="flex flex-col gap-4">
      <SelectMesAno onChange={handlePeriodo} />

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <CardOrders
          titulo="Entradas"
          valor={`R$ 1`}
          cor="#22c55e"
          corRodapeHover="#16a34a"
        />
        <CardOrders
          titulo="Saídas"
          valor={`R$ 1`}
          cor="#ef4444"
          corRodapeHover="#dc2626"
        />
      </div>

      <GraficoEntradaESaida />
    </ContainerSecundario>
  );
}

export default Dashboard;
