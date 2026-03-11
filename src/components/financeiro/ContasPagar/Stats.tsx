import CardOrders from "@src/components/comum/CardStats";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";

import { HiTrendingUp, HiTrendingDown, HiCash } from "react-icons/hi";

export default function StatsFinanceiro() {
  const { data } = UseTabela();

  const stats = data?.totalPorPeriodo || {};

  const formatar = (valor: number) =>
    Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 mb-6">
      <CardOrders
        titulo="Saidas"
        textoRodape="Soma de Saidas "
        valor={formatar(stats.Saidas)}
        cor="#ef4444"
        corRodape="#b91c1c"
        corRodapeHover="#991b1b"
        icone={<HiTrendingUp />}
      />

      <CardOrders
        titulo="Saidas"
        textoRodape="Numero de Saidas"
        valor={stats.NumerodeSaidas || 0}
        cor="#6366f1"
        corRodape="#4f46e5"
        corRodapeHover="#3730a3"
        icone={<HiCash />}
      />
    </div>
  );
}
