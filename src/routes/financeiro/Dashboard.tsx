import ContainerSecundario from "@src/components/comum/containerSecundario";
import CardOrders from "@src/components/comum/CardStats";
import GraficoEntradaESaida from "@src/components/financeiro/graficoEntradaESaida";
import SelectMesAno from "@src/components/financeiro/selectMes";
import Tabela from "@src/components/financeiro/Tabela";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { useFiltro } from "@src/hooks/useFiltros";
import { useBuscarDados } from "@src/hooks/UseBuscarDadosTabela";
import LoadingSpiner from "@src/components/loader/LoadingSpiner";
import { formatarDinheiro } from "@src/utils/dinheiro";
import { HiTrendingUp } from "react-icons/hi";
import ListarCategorias from "./ListarCategorias";
import ContainerCaixa from "@src/components/comum/ContainerCaixa";

type Registro = {
  id: number;
  tipo: "entrada" | "saida";
  categoria: string;
  valor: number;
  pago: boolean;
  data: string;
};
type TotaisPeriodo = {
  Entradas: number;
  Saidas: number;
  Lucro: number;
};

function Dashboard() {
  const [mesSelecionado, setMesSelecionado] = useState<number | null>(null);
  const [anoSelecionado, setAnoSelecionado] = useState<number | null>(null);
  const [visualizacaoMeses, setVisualizacaoMeses] = useState(3);
  const [dadosVisualizacao, setDadosVisualizacao] = useState<TotaisPeriodo>({
    Entradas: 0,
    Saidas: 0,
    Lucro: 0,
  });

  const { filtros, setFiltros, queryString } = useFiltro({
    data_minima: dayjs().startOf("month").format("YYYY-MM-DD"),
    data_maxima: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  useBuscarDados({
    endpoint: `/financeiro`,
    queryFiltro: queryString,
  });

  const {
    registros,
    data,
    loading,
    abrirModalNovoRegistro,
    abrirModalEditarRegistro,
    selectedRegistro,

    setAbrirModalNovoRegistro,
  } = UseTabela();

  useEffect(() => {
    if (data?.totalPorPeriodo) {
      setDadosVisualizacao(data.totalPorPeriodo);
    }
  }, [data]);

  const handlePeriodo = ({ mes, ano }: { mes: number; ano: number }) => {
    const data = dayjs(`${ano}-${mes}-01`);

    setMesSelecionado(Number(mes));
    setAnoSelecionado(Number(ano));

    setFiltros((prev: any) => ({
      ...prev,
      data_minima: data.startOf("month").format("YYYY-MM-DD"),
      data_maxima: data.endOf("month").format("YYYY-MM-DD"),
    }));
  };

  return (
    <LoadingSpiner loading={loading}>
      <ContainerCaixa>
        <SelectMesAno onChange={handlePeriodo} />

        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <CardOrders
            titulo="Entradas"
            textoRodape="Soma de Entradas "
            valor={formatarDinheiro(dadosVisualizacao.Entradas)}
            cor="#10b981"
            corRodape="#059669"
            corRodapeHover="#047857"
            icone={<HiTrendingUp />}
          />

          <CardOrders
            titulo="Saidas"
            textoRodape="Soma de Saidas "
            valor={formatarDinheiro(dadosVisualizacao.Saidas)}
            cor="#ef4444"
            corRodape="#b91c1c"
            corRodapeHover="#991b1b"
            icone={<HiTrendingUp />}
          />
          <CardOrders
            titulo="Saldo"
            textoRodape="Saldo Total"
            valor={formatarDinheiro(dadosVisualizacao.Lucro)}
            cor="#f1c40f"
            corRodape="#f59e0b"
            corRodapeHover="#d97706"
            icone={<HiTrendingUp />}
          />
        </div>
      </ContainerCaixa>

      <ContainerCaixa>
        <GraficoEntradaESaida />
      </ContainerCaixa>

      <ContainerCaixa>
        <ListarCategorias />
      </ContainerCaixa>
    </LoadingSpiner>
  );
}

export default Dashboard;
