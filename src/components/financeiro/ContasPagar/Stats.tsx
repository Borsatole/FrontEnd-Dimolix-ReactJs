import CardOrders from "@src/components/comum/CardStats";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { formatarDinheiro } from "@src/utils/dinheiro";

import { HiTrendingUp, HiTrendingDown, HiCash } from "react-icons/hi";

export default function StatsFinanceiro() {
  const { data } = UseTabela();

  console.log(data);

  const stats = data?.totalPorPeriodo || {};

  // const formatar = (valor: number) =>
  //   Number(valor || 0).toLocaleString("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 mb-6">
      <CardOrders
        titulo="Contas Pagas"
        textoRodape={`${stats.NumerodeSaidas || 0} Contas Pagas`}
        valor={formatarDinheiro(stats.Saidas)}
        cor="#ef4444"
        corRodape="#b91c1c"
        corRodapeHover="#991b1b"
        icone={<HiTrendingUp />}
      />

      {/* <CardOrders
        titulo="Saidas"
        textoRodape="Numero de Saidas"
        valor={stats.NumerodeSaidas || 0}
        cor="#6366f1"
        corRodape="#4f46e5"
        corRodapeHover="#3730a3"
        icone={<HiCash />}
      /> */}

      <CardOrders
        titulo="Contas Pendentes"
        textoRodape={`${stats.NumerodePendentes || 0} contas pendentes`}
        valor={formatarDinheiro(stats.Pendentes)}
        cor="#616161"
        corRodape="#4f4f4f"
        corRodapeHover="#373737"
        icone={<HiTrendingUp />}
      />
    </div>
  );
}
