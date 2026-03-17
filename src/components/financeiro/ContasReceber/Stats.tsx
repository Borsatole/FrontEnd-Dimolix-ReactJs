import CardOrders from "@src/components/comum/CardStats";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { formatarDinheiro } from "@src/utils/dinheiro";

import { HiTrendingUp, HiTrendingDown, HiCash } from "react-icons/hi";

export default function StatsFinanceiro() {
  const { data } = UseTabela();

  const stats = data?.totalPorPeriodo || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 mb-6">
      <CardOrders
        titulo="Entradas"
        textoRodape="Soma de Entradas "
        valor={formatarDinheiro(stats.Entradas)}
        cor="#10b981"
        corRodape="#059669"
        corRodapeHover="#047857"
        icone={<HiTrendingUp />}
      />

      <CardOrders
        titulo="Entradas"
        textoRodape="Numero de Entradas"
        valor={stats.NumerodeEntradas || 0}
        cor="#6366f1"
        corRodape="#4f46e5"
        corRodapeHover="#3730a3"
        icone={<HiCash />}
      />
    </div>
  );
}
