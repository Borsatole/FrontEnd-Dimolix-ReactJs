import { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import { useEstoque } from "@src/context/EstoqueContext";
import TabelaDinamica, {
  AcaoConfig,
  ColunaConfig,
} from "@src/components/comum/TabelaDinamica";
import LoadingSpiner from "../loader/LoadingSpiner";
import { getIcon } from "../icons";
import { LetraMaiuscula, MaxCaracteres } from "@src/services/funcoes-globais";
import { Create, Delete, Read } from "@src/services/crud2";
import { MdOutlineUpdate } from "react-icons/md";

import dayjs from "dayjs";
import { Button } from "../comum/button";
import DetalhesAgendamento from "./DetalhesAgendamento";
import Regendar from "./Regendar";
import NovoAgendamento from "./NovoAgendamento";

function ModalAgendamentos() {
  const {
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

  const [registros, setRegistros] = useState<any[]>([]);
  const [atualizarAgendamentos, setAtualizarAgendamentos] = useState(false);

  const [abrirModalNovoAgendamento, setAbrirModalNovoAgendamento] =
    useState(false);

  const [abrirModalDetalhesAgendamentos, setAbrirModalDetalhesAgendamentos] =
    useState(false);

  const [abrirModalReagendamento, setAbrirModalReagendamento] = useState(false);

  const [loading, setLoading] = useState(false);

  // Configuração das colunas da tabela
  const colunas: ColunaConfig<any>[] = [
    {
      key: "nome",
      label: "NOME",
      render: (registro) =>
        LetraMaiuscula(
          MaxCaracteres(
            registro.cliente.nome || registro.cliente.razao_social,
            30,
          ),
        ),
    },
    {
      key: "locacao",
      label: "LOCAÇÃO",
      render: (registro) => LetraMaiuscula(registro.categoria_item || "-"),
    },
    {
      key: "bairro",
      label: "BAIRRO",
      render: (registro) => registro.endereco.bairro || "-",
    },
    {
      key: "data_e_hora",
      label: "DATA E HORA",
      render: (registro) =>
        registro.data_agendamento
          ? dayjs(registro.data_agendamento).format("DD/MM/YYYY HH:mm")
          : "-",
    },
  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<any>[] = [
    {
      icon: <div className="cursor-pointer">{getIcon("enviar", 20)}</div>,
      tooltip: "Locar",
      onClick: (registro) => {
        console.log(registro);
        Create({
          endpoint: "/locacoes",
          payload: {
            agendamento_id: registro.id,
          },
          depoisDeExecutar: () => {
            setRelistar(true);
            setAtualizarAgendamentos(true);
          },
        });
      },
    },
    {
      icon: (
        <div className="cursor-pointer">
          <MdOutlineUpdate size={20} />
        </div>
      ),
      tooltip: "Reagendar",
      onClick: (registro) => {
        setAbrirModalReagendamento(true);
        setSelectedRegistro(registro);
      },
    },
    {
      icon: <div className="cursor-pointer">{getIcon("visualizar", 20)}</div>,
      tooltip: "Ver detalhes",
      onClick: (registro) => {
        setSelectedRegistro(registro);
        setAbrirModalDetalhesAgendamentos(true);
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
          endpoint: `/agendamentos/${registro.id}`,
          antesDeExecutar: () => {
            setLoadingSpiner(true);
          },
          depoisDeExecutar: () => {
            setLoadingSpiner(false);
            // setRelistar(true);
          },
        });
        setSelectedRegistro(null);
      },
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-lg p-2">
      {getIcon("agendamentos", 25)}
    </div>
  );

  useEffect(() => {
    Read({
      endpoint: "/agendamentos",
      queryFiltro: `order_by=data_agendamento&order_dir=asc`,
      setRegistros,
      setTotalResultados: () => {},
      setTotalPaginas: () => {},
      setLoadingSpiner: () => {},
      setRelistar: () => {},
    });
  }, []);

  useEffect(() => {
    if (!atualizarAgendamentos) return;
    setLoading(true);
    Read({
      endpoint: "/agendamentos",
      queryFiltro: `order_by=data_agendamento&order_dir=asc`,
      setRegistros,
      setTotalResultados: () => {},
      setTotalPaginas: () => {},
      setLoadingSpiner: () => {},
      setRelistar: () => {
        setAtualizarAgendamentos(false);
        setLoading(false);
      },
    });
  }, [atualizarAgendamentos]);

  return (
    <>
      <Modal
        IsOpen={true}
        onClose={() => setAbrirModalAgendamentos(false)}
        className="w-full h-full lg:w-[100%]"
      >
        <LoadingSpiner loading={loading}>
          <div>
            <div className="flex items-center justify-center p-5">
              <h2 className="text-2xl font-semibold">Agendamentos</h2>
              <Button
                onClick={() => setAbrirModalNovoAgendamento(true)}
                className="ms-3"
              >
                <p className="flex items-center gap-2">
                  {getIcon("agendamentos", 20)}
                  <span>Agendar</span>
                </p>
              </Button>
            </div>
            {/* Tabela dinâmica */}
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
            </LoadingSpiner>
          </div>
        </LoadingSpiner>
      </Modal>
      {/* Detalhes do agendamento */}
      {abrirModalDetalhesAgendamentos && (
        <DetalhesAgendamento
          setAbrirModalDetalhesAgendamentos={setAbrirModalDetalhesAgendamentos}
          selectedRegistro={selectedRegistro}
          setSelectedRegistro={setSelectedRegistro}
        />
      )}
      {abrirModalReagendamento && (
        <Regendar
          setAbrirModalReagendamento={setAbrirModalReagendamento}
          setAtualizarAgendamentos={setAtualizarAgendamentos}
          selectedRegistro={selectedRegistro}
          setSelectedRegistro={setSelectedRegistro}
        />
      )}

      {abrirModalNovoAgendamento && (
        <NovoAgendamento
          setAbrirModalNovoAgendamento={setAbrirModalNovoAgendamento}
          setAtualizarAgendamentos={setAtualizarAgendamentos}
        />
      )}
    </>
  );
}

export default ModalAgendamentos;
