import { useEffect, useState } from "react";

// LOADERS
import LoadingSpiner from "@components/loader/LoadingSpiner";

// FUNCOES
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
import ModalEditarRegistro from "./EditarRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";

import { Delete, Read } from "@src/services/crud2";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { SoftRender } from "@src/components/comum/SoftRender";
import Novoregistrobtn from "@src/components/comum/Tabelas/Novoregistrobtn";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import StatsFinanceiro from "./Stats";
import { useRefresh } from "@src/context/RefreshContext";
import { useLocation } from "react-router-dom";

type Config = {
  endpoint: string;
  icone?: string;
};

const config: Config = {
  endpoint: "/financeiro",
  icone: "contasfixas",
};

function Tabela() {
  const { setRefresh } = useRefresh();
  const [loading, setLoading] = useState(true);
  const [aparecerSuave, setAparecerSuave] = useState(false);

  // Contexto que controla a tabela.tsx
  const {
    registros,
    setRegistros,
    data,
    setData,
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
  } = UseTabela();

  // Hook que controla a paginacao
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

  // Configuração das colunas da tabela
  const colunas: ColunaConfig<any>[] = [
    {
      key: "id",
      label: "ID",
      render: (registro) => registro.id || "-",
    },
    {
      key: "descricao",
      label: "DESCRICAO",
      render: (registro) => registro.descricao ?? "-",
    },
    {
      key: "categoria",
      label: "CATEGORIA",
      render: (registro) => {
        const categoria = registro.categoria;

        return (
          <div className="flex justify-center">
            <div
              className="flex items-center gap-2 
                      bg-gradient-to-r 
                      from-[var(--corPrincipal)]/30 
                      to-[var(--corPrincipal)]/20
                      
                      rounded-full 
                      px-4 py-1.5 
                      text-xs font-semibold 
                      uppercase tracking-wide 
                      shadow-md"
            >
              <span>{categoria}</span>
            </div>
          </div>
        );
      },
    },

    {
      key: "valor",
      label: "VALOR",
      render: (registro) => registro.valor || "-",
    },
    {
      key: "status",
      label: "STATUS",
      render: (registro) => {
        const status = registro.status || "";

        return (
          <div className="flex justify-center">
            <div
              className={`
                flex items-center gap-2 
                      
                ${
                  status.toLowerCase() === "concluido"
                    ? "bg-green-600 text-white"
                    : "bg-gradient-to-r from-[var(--corPrincipal)]/30 to-[var(--corPrincipal)]/20"
                }
                      
                      rounded-full 
                      px-4 py-1.5 
                      text-xs font-semibold 
                      uppercase tracking-wide 
                      shadow-md
                `}
            >
              <span>{status}</span>
            </div>
          </div>
        );
      },
    },
  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<any>[] = [
    {
      icon: <div className="cursor-pointer">{getIcon("editar", 20)}</div>,
      tooltip: "Editar",
      onClick: (registro) => {
        setSelectedRegistro(registro);
        setAbrirModalEditarRegistro(true);
      },
    },
    {
      icon: <div className="cursor-pointer">{getIcon("deletar", 20)}</div>,
      tooltip: "Excluir",
      onClick: (registro) => {
        Delete({
          registro,
          registros,
          setRegistros,
          endpoint: `${config.endpoint}/${registro.id}`,
          antesDeExecutar: () => {
            setLoadingSpiner(true);
          },
          depoisDeExecutar: () => {
            setLoadingSpiner(false);
            setRelistar(true);
          },
        });
        setSelectedRegistro(null);
      },
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)]/10 rounded-lg p-2">
      {getIcon("contasfixas", 25)}
    </div>
  );

  useEffect(() => {
    if (!relistar) return;
    Read({
      endpoint: `${config.endpoint}`,
      queryFiltro: `tipo_movimentacao=entrada`,
      pagina,
      limitePorPagina,
      setRegistros,
      setData,
      setTotalResultados,
      setTotalPaginas,
      setLoadingSpiner,
      setRelistar,
      setLoading,
    });
  }, [relistar]);

  useEffect(() => {
    Read({
      endpoint: `${config.endpoint}`,
      queryFiltro: `tipo_movimentacao=entrada`,
      pagina,
      limitePorPagina,
      setRegistros,
      setData,
      setTotalResultados,
      setTotalPaginas,
      setLoadingSpiner,
      setRelistar,
      setLoading,
    });
  }, [pagina, limitePorPagina, queryFiltro]);

  useEffect(() => {
    if (registros.length >= 0) {
      setLoading(false);
      setAparecerSuave(true);
    }
  }, [registros]);

  // useEffect(() => {
  //   const refreshTabela = () => setRelistar(true);
  //   setRefresh(refreshTabela);
  //   return () => setRefresh(undefined);
  // }, []);

  return (
    <>
      <Novoregistrobtn
        icone={config.icone}
        onClick={() => setAbrirModalNovoRegistro(true)}
      />
      <StatsFinanceiro />
      {/* <FiltroCadastros onFiltrar={setQueryFiltro} /> */}
      {/* <MostrarNumeroDeResultados totalResultados={totalResultados} /> */}

      {/* Tabela dinâmica */}
      <SoftRender show={aparecerSuave}>
        <LoadingSpiner loading={loadingSpiner}>
          <TabelaDinamica<any>
            dados={registros}
            colunas={colunas}
            acoes={acoes}
            iconeItem={iconeItem}
            keyExtractor={(item) => item.id ?? 0}
            mensagemVazia="Nenhum cadastro encontrado"
            className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
          />

          <Rodape
            pagina={pagina}
            limitePorPagina={limitePorPagina}
            registros={registros}
            totalResultados={totalResultados}
            totalPaginas={totalPaginas}
            setPagina={setPagina}
            setLimitePorPagina={setLimitePorPagina}
          />
        </LoadingSpiner>
      </SoftRender>

      {/* Modais */}
      {abrirModalEditarRegistro && selectedRegistro && <ModalEditarRegistro />}
      {abrirModalNovoRegistro && <ModalAdicionarRegistro />}
    </>
  );
}

export default Tabela;
