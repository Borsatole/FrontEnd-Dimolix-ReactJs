import { useEffect, useState } from "react";

// REQUISICOES E CRUD
import { requisicaoGet } from "@services/requisicoes";

// LOADERS
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";

// TIPOS
import { Cliente } from "@src/components/tipos";

// FUNCOES
import { MaxCaracteres } from "@src/services/funcoes-globais";
import { LetraMaiuscula } from "@services/funcoes-globais";
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
import ModalEditarRegistro from "@src/components/clientes/EditarRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";

import { FiltroCadastros } from "./FiltroRegistro";
import { Delete } from "@src/services/crud2";
import { useClientes } from "@src/context/ClientesContext";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { useFetch } from "@src/hooks/useFetch";

function Tabela() {
  const [loading, setLoading] = useState(true);

  // Contexto que controla a tabela.tsx
  const {
    registros,
    setRegistros,
    relistar,
    setRelistar,
    loadingSpiner,
    setLoadingSpiner,
    selectedCliente,
    setSelectedCliente,
    abrirModalNovoRegistro,
    setAbrirModalNovoRegistro,
    abrirModalEditarRegistro,
    setAbrirModalEditarRegistro,
  } = useClientes();

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
  const colunas: ColunaConfig<Cliente>[] = [
    {
      key: "nome",
      label: "NOME",
      render: (registro) =>
        LetraMaiuscula(
          MaxCaracteres(registro.nome || registro.razao_social, 30),
        ),
    },
    {
      key: "celular",
      label: "CELULAR",
      render: (registro) => registro.celular || "-",
    },
    {
      key: "endereco",
      label: "BAIRRO",
      render: (registro) => {
        if (!registro.enderecos || registro.enderecos.length === 0) return "-";

        return (
          <div className="text-left">
            {registro.enderecos.map((e, i) => (
              <div key={i}>
                {LetraMaiuscula(MaxCaracteres(`${e.bairro}`, 20))}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      key: "email",
      label: "E-MAIL",
      render: (registro) => registro.email || "-",
    },
  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<Cliente>[] = [
    {
      icon: <div className="cursor-pointer">{getIcon("editar", 20)}</div>,
      tooltip: "Editar",
      onClick: (registro) => {
        setSelectedCliente(registro);
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
          endpoint: `/clientes/${registro.id}`,
          antesDeExecutar: () => {
            setLoadingSpiner(true);
          },
          depoisDeExecutar: () => {
            setLoadingSpiner(false);
            // setRelistar(true);
          },
        });
        setSelectedCliente(null);
      },
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-lg p-2">
      {getIcon("clientes", 25)}
    </div>
  );

  useEffect(() => {
    buscarDados({
      endpoint: `/clientes`,
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
  }, [pagina, limitePorPagina, queryFiltro, relistar]);

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      <BotaoNovoRegistro onClick={() => setAbrirModalNovoRegistro(true)} />
      <FiltroCadastros onFiltrar={setQueryFiltro} />

      <div className="flex justify-between items-center m-3">
        <MostrarNumeroDeResultados totalResultados={totalResultados} />
      </div>

      {/* Tabela dinâmica */}
      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<Cliente>
          dados={registros}
          colunas={colunas}
          acoes={acoes}
          iconeItem={iconeItem}
          keyExtractor={(item) => item.id ?? 0}
          mensagemVazia="Nenhum cadastro encontrado"
          className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
        />
      </LoadingSpiner>

      {/* Rodapé da tabela */}
      {totalResultados > limitePorPagina && (
        <Rodape
          pagina={pagina}
          limitePorPagina={limitePorPagina}
          registros={registros}
          totalResultados={totalResultados}
          totalPaginas={totalPaginas}
          setPagina={setPagina}
          setLimitePorPagina={setLimitePorPagina}
        />
      )}

      {/* Modais */}
      {abrirModalEditarRegistro && selectedCliente && <ModalEditarRegistro />}
      {abrirModalNovoRegistro && <ModalAdicionarRegistro />}
    </>
  );
}

export default Tabela;

function BotaoNovoRegistro({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-between">
      <Button onClick={onClick} className="mb-3">
        <p className="flex items-center gap-2">
          {getIcon("clientes", 20)}
          <span>Criar Cliente</span>
        </p>
      </Button>
    </div>
  );
}

function buscarDados({
  endpoint = "",
  queryFiltro = "",
  pagina = 1,
  limitePorPagina = 7,
  setRegistros,
  setTotalResultados,
  setTotalPaginas,
  setLoadingSpiner,
  setRelistar,
  setLoading,
}: {
  endpoint: string;
  queryFiltro: string;
  pagina: number;
  limitePorPagina: number;
  setRegistros: React.Dispatch<React.SetStateAction<Cliente[]>>;
  setTotalResultados: React.Dispatch<React.SetStateAction<number>>;
  setTotalPaginas: React.Dispatch<React.SetStateAction<number>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  setLoadingSpiner(true);
  requisicaoGet(
    `${endpoint}?${queryFiltro}&pagina=${pagina}&limite=${limitePorPagina}`,
  ).then((response) => {
    if (response?.data.success) {
      // console.log(response.data);
      setRegistros(response.data.registros);
      setTotalResultados(response.data.paginacao.total);
      setTotalPaginas(response.data.paginacao.ultimaPagina);
    }
    setLoadingSpiner(false);
    setRelistar(false);
    setLoading(false);
  });
}
