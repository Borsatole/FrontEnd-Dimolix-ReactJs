import { Button } from "@src/components/comum/button";
import ContainerSecundario from "@src/components/comum/containerSecundario";
import CardOrders from "@src/components/comum/CardStats";
import { TituloPagina } from "@src/components/comum/Textos";
import Entradas from "@src/components/financeiro/Categorias/Entradas";
import NovoRegistro from "@src/components/financeiro/Categorias/NovoRegistro";
import Saidas from "@src/components/financeiro/Categorias/Saidas";
import GraficoEntradaESaida from "@src/components/financeiro/graficoEntradaESaida";
import SelectMesAno from "@src/components/financeiro/selectMes";
import Tabela from "@src/components/financeiro/Tabela";
import { useFinanceiro } from "@src/context/FinanceiroContext";
import { Read } from "@src/services/crud2";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

type Registro = {
  id: number;
  tipo: "entrada" | "saida";
  categoria: string;
  valor: number;
  pago: boolean;
  data: string;
};

function Categorias() {
  const [registros, setRegistros] = useState<any[]>([]);

  const [categoriasDeEntrada, setCategoriasDeEntrada] = useState<string[]>([]);
  const [categoriasDeSaida, setCategoriasDeSaida] = useState<string[]>([]);

  const [abrirModalNovo, setAbrirModalNovo] = useState(false);

  const [relistar, setRelistar] = useState(true);

  useEffect(() => {
    if (!relistar) return;
    Read({
      endpoint: "/financeiro-categorias",
      setRegistros,
      setRelistar,
    });
  }, [relistar]);

  useEffect(() => {
    const categoriasEntrada = registros.filter(
      (registro) => registro.tipo === "entrada",
    );

    const categoriasSaida = registros.filter(
      (registro) => registro.tipo === "saida",
    );

    setCategoriasDeEntrada(categoriasEntrada);
    setCategoriasDeSaida(categoriasSaida);
  }, [registros]);

  return (
    <ContainerSecundario className="flex flex-col gap-4">
      <TituloPagina>Categorias</TituloPagina>

      <div className="w-full flex justify-start">
        <Button
          className="mb-6"
          onClick={() => {
            setAbrirModalNovo(true);
          }}
        >
          Adicionar Categoria
        </Button>
      </div>

      <Entradas
        categorias={categoriasDeEntrada}
        setRelistar={setRelistar}
        relistar={relistar}
      />
      <Saidas
        categorias={categoriasDeSaida}
        setRelistar={setRelistar}
        relistar={relistar}
      />

      {abrirModalNovo && (
        <NovoRegistro
          setAbrirModalNovo={setAbrirModalNovo}
          setRelistar={setRelistar}
        />
      )}
    </ContainerSecundario>
  );
}

export default Categorias;
