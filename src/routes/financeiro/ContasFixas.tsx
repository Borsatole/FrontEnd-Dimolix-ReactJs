import ContainerSecundario from "@src/components/comum/containerSecundario";
import CardOrders from "@src/components/comum/StatsLte";
import { TituloPagina } from "@src/components/comum/Textos";
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

function ContasFixas() {
  return (
    <ContainerSecundario className="flex flex-col gap-4">
      <TituloPagina>Contas Fixas</TituloPagina>
    </ContainerSecundario>
  );
}

export default ContasFixas;
