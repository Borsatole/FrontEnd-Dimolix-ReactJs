import { useEffect, useState } from "react";
import { Badge, HR } from "flowbite-react";

// REQUISICOES E CRUD
import { requisicaoGet } from "@services/requisicoes";

// LOADERS
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";

// TIPOS
import { DadosLocacao, GrupoEstoque, ItemEstoque } from "@src/components/tipos";

// FUNCOES
import { Datas, Valores } from "@src/services/funcoes-globais";
import { PrimeraLetraMaiuscula } from "@services/funcoes-globais";
import { Button } from "@components/comum/button";
import { getIcon } from "@src/components/icons";

// TABELA
import {
  MostrarNumeroDeResultados,
  Rodape,
} from "@src/components/comum/tabelas";
import TabelaDinamica, {
  ColunaConfig,
  AcaoConfig,
} from "@src/components/comum/TabelaDinamica";

// MODAIS E FILTROS
// import EditarRegistro from "./DetalhesRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";
import CardCacambaEstoque from "./CardCacambaEstoque";
import DetalhesRegistro from "./DetalhesRegistro";
import RetiradaRegistro from "./RetiradaRegistro";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { useEstoque } from "@src/context/EstoqueContext";
import EditarRegistro from "./EditarRegistro";
import OpcaoVisualizacao from "./OpcaoVisualizacao";
import { CaixaExpansora } from "@src/components/comum/CaixaExpansora";
import ModalAgendamentos from "./ModalAgendamentos";
import { Read } from "@src/services/crud2";

function Tabela() {
  {
    /* Controla Loading do skeleton */
  }
  const [loading, setLoading] = useState(true);

  type FiltroStatus = "todos" | "locado" | "disponivel";

  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("locado");

  {
    /* Contexto que controla a tabela.tsx */
  }
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
    abrirModalDetalhesRegistro,
    setAbrirModalDetalhesRegistro,
    abrirModalAgendamentos,
    setAbrirModalAgendamentos,
  } = useEstoque();

  {
    /* Hook que controla a paginacao */
  }
  const {
    pagina,
    setPagina,
    queryFiltro,
    setQueryFiltro,
    limitePorPagina,
    setLimitePorPagina,
    totalPaginas,
    setTotalPaginas,
    totalResultados,
    setTotalResultados,
  } = usePaginacao();

  const resumoPorCategoria = registros.reduce(
    (acc, grupo) => {
      const total = grupo.itens.length;
      const locados = grupo.itens.filter(
        (item: any) => item.status === "locado",
      ).length;

      acc[grupo.categoria] = { total, locados };
      return acc;
    },
    {} as Record<string, { total: number; locados: number }>,
  );

  const totais = registros.reduce(
    (acc, grupo) => {
      grupo.itens.forEach((item: any) => {
        acc.total++;

        if (item.status === "locado") acc.locados++;
        if (item.status === "disponivel") acc.disponiveis++;
      });

      return acc;
    },
    { total: 0, locados: 0, disponiveis: 0 },
  );

  const registrosFiltrados = registros
    .map((grupo) => {
      let itensFiltrados = grupo.itens;

      if (filtroStatus !== "todos") {
        itensFiltrados = grupo.itens.filter(
          (item: any) => item.status === filtroStatus,
        );
      }

      return {
        ...grupo,
        itens: itensFiltrados,
      };
    })
    .filter((grupo) => grupo.itens.length > 0);

  {
    /* Controla Modais Locais */
  }
  const [abrirModalRegistrarRetirada, setAbrirModalRegistrarRetirada] =
    useState(false);
  const [abrirModalRegistrarLocacao, setAbrirModalRegistrarLocacao] =
    useState(false);

  {
    /* Fecha Todos Modais Ao Selecionar Registro */
  }
  useEffect(() => {
    if (selectedRegistro === null) {
      setAbrirModalDetalhesRegistro(false);
      setAbrirModalEditarRegistro(false);
      setAbrirModalRegistrarRetirada(false);
      setAbrirModalRegistrarLocacao(false);
    }
  }, [selectedRegistro]);

  {
    /* Busca Dados da Api */
  }
  useEffect(() => {
    Read({
      endpoint: `/estoque`,
      queryFiltro,
      pagina,
      limitePorPagina,
      setRegistros,
      setTotalResultados,
      setTotalPaginas,
      setLoadingSpiner,
      setRelistar,
      setLoading,
    });
  }, [pagina, limitePorPagina, queryFiltro]);

  useEffect(() => {
    if (!relistar) return;

    Read({
      endpoint: `/estoque`,
      queryFiltro,
      pagina,
      limitePorPagina,
      setRegistros,
      setTotalResultados,
      setTotalPaginas,
      setLoadingSpiner,
      setRelistar,
      setLoading,
    });
  }, [relistar]);

  return (
    <>
      <OpcaoVisualizacao
        setFiltroStatus={setFiltroStatus}
        filtroStatus={filtroStatus}
        totais={totais}
      />

      <Agendamentos setAbrirModalAgendamentos={setAbrirModalAgendamentos} />

      {/* Listagem Dados */}
      <LoadingSpiner loading={loadingSpiner}>
        {registrosFiltrados.map((registro, i) => {
          const resumo = resumoPorCategoria[registro.categoria];

          return (
            <CaixaExpansora
              key={registro.categoria}
              titulo={`${registro.categoria}`}
              subtitulo={`
                ${resumo.locados}/${resumo.total} locados • ${
                  resumo.total - resumo.locados
                } disponíveis`}
            >
              <div className="grid mt-3 sm:grid-cols-2 md:grid-cols-3 gap-2 md:mx-auto">
                {registro.itens.map((item: any, i: number) => (
                  <CardCacambaEstoque
                    key={i}
                    item={item}
                    setSelectedRegistro={setSelectedRegistro}
                    setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
                    setAbrirModalDetalhesRegistro={
                      setAbrirModalDetalhesRegistro
                    }
                    setAbrirModalRegistrarLocacao={
                      setAbrirModalRegistrarLocacao
                    }
                    setAbrirModalRegistrarRetirada={
                      setAbrirModalRegistrarRetirada
                    }
                  />
                ))}
              </div>
            </CaixaExpansora>
          );
        })}
      </LoadingSpiner>

      {/* Modais */}
      {abrirModalDetalhesRegistro && selectedRegistro && <DetalhesRegistro />}
      {abrirModalRegistrarRetirada && selectedRegistro && <RetiradaRegistro />}
      {abrirModalAgendamentos && <ModalAgendamentos />}

      {abrirModalEditarRegistro && selectedRegistro && <EditarRegistro />}
      {abrirModalNovoRegistro && <ModalAdicionarRegistro />}
    </>
  );
}

export default Tabela;

type AgendamentosProps = {
  setAbrirModalAgendamentos: React.Dispatch<React.SetStateAction<boolean>>;
};

function Agendamentos({ setAbrirModalAgendamentos }: AgendamentosProps) {
  return (
    <div
      className="bg-[var(--base-variant)] rounded-2xl shadow-lg border border-[var(--base-color)] overflow-hidden mb-6 transition-all duration-300 p-3 flex items-center justify-center"
      onClick={() => setAbrirModalAgendamentos(true)}
    >
      <p className="flex items-center gap-2 cursor-pointer">
        <span className="font-semibold ">Agendamentos</span>
      </p>
    </div>
  );
}
