// LOADERS
import LoadingSpiner from "@components/loader/LoadingSpiner";

// FUNCOES
import { getIcon } from "@src/components/icons";

// TABELA
import TabelaDinamica from "@src/components/comum/TabelaDinamica";

// MODAIS E FILTROS
import ModalEditarRegistro from "./EditarRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";

import { SoftRender } from "@src/components/comum/SoftRender";
import Novoregistrobtn from "@src/components/comum/Tabelas/Novoregistrobtn";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { FiltroUniversal } from "@src/components/comum/FiltroUniversal";
import { useFiltro } from "@src/hooks/useFiltros";
import dayjs from "dayjs";
import { useBuscarDados } from "@src/hooks/UseBuscarDadosTabela";
import { colunas } from "./tabelaColunas";
import { useTabelaAcoes } from "./tabelaAcoes";
import Paginacao from "@src/components/comum/Paginacao";

type Config = {
  endpoint: string;
  icone?: string;
};

const config: Config = {
  endpoint: "/financeiro-contas-fixas",
  icone: "contasfixas",
};

function Tabela() {
  const { filtros, setFiltros, queryString } = useFiltro({
    tipo_movimentacao: "saida",
    data_minima: dayjs().startOf("month").format("YYYY-MM-DD"),
    data_maxima: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  useBuscarDados({
    endpoint: config.endpoint,
    queryFiltro: queryString,
  });

  // Contexto que controla a tabela.tsx
  const {
    registros,
    data,
    loading,
    abrirModalNovoRegistro,
    abrirModalEditarRegistro,
    selectedRegistro,

    setAbrirModalNovoRegistro,
  } = UseTabela();

  const acoes = useTabelaAcoes({
    endpoint: config.endpoint,
  });

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)]/10 rounded-lg p-2">
      {getIcon("contasfixas", 25)}
    </div>
  );

  return (
    <>
      <Novoregistrobtn
        icone={config.icone}
        onClick={() => setAbrirModalNovoRegistro(true)}
      />
      {/* <MostrarNumeroDeResultados totalResultados={totalResultados} /> */}

      {/* <FiltroUniversal
      
        filtros={filtros}
        setFiltros={setFiltros}
        expandir={false}
        campos={[
          {
            name: "data_minima",
            label: "DATA INICIO",
            type: "date",
            defaultValue: dayjs().startOf("month").format("YYYY-MM-DD"),
          },
          {
            name: "data_maxima",
            label: "DATA FIM",
            type: "date",
            defaultValue: dayjs().endOf("month").format("YYYY-MM-DD"),
          },
          {
            name: "descricao",
            label: "DESCRIÇÃO",
            type: "text",
          },
          {
            name: "id_categoria",
            label: "CATEGORIA",
            type: "select",
            options: data?.categorias || [],
            labelKey: "categoria_item",
            valueKey: "id",
          },
          {
            name: "status",
            label: "STATUS",
            type: "select",
            options: [{ status: "Pendente" }, { status: "Concluido" }],
            labelKey: "status",
            valueKey: "status",
          },
        ]}
      /> */}

      {/* Tabela dinâmica */}
      <SoftRender show={true}>
        <LoadingSpiner loading={loading}>
          <TabelaDinamica<any>
            dados={registros}
            colunas={colunas}
            acoes={acoes}
            iconeItem={iconeItem}
            keyExtractor={(item) => item.id ?? 0}
            mensagemVazia="Nenhum cadastro encontrado"
            className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
          />

          <Paginacao />
        </LoadingSpiner>
      </SoftRender>

      {/* Modais */}
      {abrirModalEditarRegistro && selectedRegistro && <ModalEditarRegistro />}
      {abrirModalNovoRegistro && <ModalAdicionarRegistro />}
    </>
  );
}

export default Tabela;
