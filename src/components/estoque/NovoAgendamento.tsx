import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import ProcurarClientes from "./ProcuraClientes";
import { Endereco, Cliente } from "../tipos";
import { Button } from "../comum/button";
import CliqueParaSelecionar from "../comum/CliqueParaSelecionar";
import BotaoSeletor from "../comum/buttonSelected";
import dayjs from "dayjs";
import { FormGroup } from "../comum/FormGroup";
import { Input, TextArea } from "../comum/input";
import { SelectModificado } from "../comum/select";
import { Create } from "@src/services/crud2";

interface NovoAgendamentoProps {
  setAbrirModalNovoAgendamento: (abrir: boolean) => void;
  setAtualizarAgendamentos: (atualizar: boolean) => void;
}

interface InfoProps {
  label: string;
  value: string | number;
}

const DIAS_PADRAO_LOCACAO = 7;

function Info({ label, value }: InfoProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-600">{label}</span>
      <span className="text-base font-medium">{value}</span>
    </div>
  );
}

function NovoAgendamento({
  setAbrirModalNovoAgendamento,
  setAtualizarAgendamentos,
}: NovoAgendamentoProps) {
  const [abrirModalProcuraClientes, setAbrirModalProcuraClientes] =
    useState(false);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [cliente_id, setCliente_id] = useState<number | null>(null);
  const [dadosCliente, setDadosCliente] = useState<Cliente | null>(null);
  const [enderecoSelecionado, setEnderecoSelecionado] =
    useState<Endereco | null>(null);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [horario, setHorario] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string>("");

  const categorias = ["Caçamba 4,5m²", "Caçamba 6m²"];
  const formasPagamento = ["dinheiro", "credito", "debito", "pix", "outro"];

  const [categoria, setCategoria] = useState<string>("");
  const [data_agendamento, setData_agendamento] = useState<string>("");
  const [preco_total, setPreco_total] = useState<number>(0);
  const [observacoes, setObservacoes] = useState<string>("");
  const [forma_pagamento, setForma_pagamento] = useState<string>("");

  const toggleEnderecoSelecionado = (endereco: Endereco) => {
    setEnderecoSelecionado((atual) =>
      atual?.id === endereco.id ? null : endereco,
    );
  };

  const handleChangeDataInicio = (value: string) => {
    setDataInicio(value);
    setErro("");

    if (dayjs(value).isValid()) {
      const novaDataFim = dayjs(value)
        .add(DIAS_PADRAO_LOCACAO, "day")
        .format("YYYY-MM-DD");
      setDataFim(novaDataFim);
    }
  };

  const handleChangeDataFim = (value: string) => {
    setDataFim(value);
    setErro("");

    if (dataInicio && dayjs(value).isBefore(dayjs(dataInicio))) {
      setErro("A data fim deve ser posterior à data início");
    }
  };

  const inicializarDatas = () => {
    const inicio = dayjs().add(1, "day");
    const fim = dayjs().add(DIAS_PADRAO_LOCACAO + 1, "day");
    const horarioAtual = dayjs().format("HH:mm");

    setDataInicio(inicio.format("YYYY-MM-DD"));
    setDataFim(fim.format("YYYY-MM-DD"));
    setHorario(horarioAtual);
  };

  const validarFormulario = (): boolean => {
    if (!enderecoSelecionado) {
      setErro("Selecione um endereço");
      return false;
    }

    if (!dataInicio || !dataFim || !horario) {
      setErro("Preencha todos os campos obrigatórios");
      return false;
    }

    if (dayjs(dataFim).isBefore(dayjs(dataInicio))) {
      setErro("A data fim deve ser posterior à data início");
      return false;
    }

    if (!categoria) {
      setErro("Selecione uma categoria");
      return false;
    }

    if (!preco_total) {
      setErro("Digite um valor valido");
      return false;
    }

    if (!forma_pagamento) {
      setErro("Selecione uma forma de pagamento");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!validarFormulario()) return;

    const payload = {
      cliente_id,
      categoria_item: categoria,
      endereco_id: enderecoSelecionado?.id,
      data_agendamento: dayjs(`${dataInicio} ${horario}`).format(
        "YYYY-MM-DD HH:mm:ss",
      ),
      data_inicio: dataInicio,
      data_fim: dataFim,
      preco_total: Number(preco_total),
      observacoes: observacoes,
      forma_pagamento,
    };

    Create<any>({
      payload,
      endpoint: "/agendamentos",
      antesDeExecutar: () => {
        setLoading(true);
      },
      depoisDeExecutar: () => {
        setLoading(false);
        setAbrirModalNovoAgendamento(false);
        setAtualizarAgendamentos(true);
      },
    });
  };

  const handleFecharModal = () => {
    if (!loading) setAbrirModalNovoAgendamento(false);
  };

  useEffect(() => {
    if (dadosCliente) inicializarDatas();
  }, [dadosCliente]);

  useEffect(() => {
    if (enderecos.length === 1 && !enderecoSelecionado) {
      setEnderecoSelecionado(enderecos[0]);
    }
  }, [enderecos, enderecoSelecionado]);

  return (
    <Modal IsOpen={true} onClose={handleFecharModal}>
      {!dadosCliente ? (
        <div className="p-8">
          <CliqueParaSelecionar
            onClick={() => setAbrirModalProcuraClientes(true)}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="bg-[var(--base-variant)] p-4 rounded-xl shadow-md border border-[var(--base-variant)]">
            <h3 className="text-lg font-semibold mb-4">Dados da Locação</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Info label="Cliente" value={dadosCliente.nome} />
            </div>

            <FormGroup label="Endereços*" id="enderecos">
              {enderecos.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  Nenhum endereço cadastrado
                </p>
              ) : (
                <div className="space-y-2">
                  {enderecos.map((endereco) => (
                    <BotaoSeletor
                      className="w-full"
                      key={endereco.id}
                      value={String(endereco.id)}
                      selectedValue={String(enderecoSelecionado?.id || "")}
                      onClick={() => toggleEnderecoSelecionado(endereco)}
                      label={`${endereco.logradouro}, ${endereco.bairro}`}
                    />
                  ))}
                </div>
              )}
            </FormGroup>

            <FormGroup label="Categoria*" id="categoria">
              <SelectModificado
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </SelectModificado>
            </FormGroup>

            <FormGroup label="Data início*" id="data_inicio">
              <Input
                type="date"
                id="data_inicio"
                value={dataInicio}
                required
                min={dayjs().add(1, "day").format("YYYY-MM-DD")}
                onChange={(e) => handleChangeDataInicio(e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Data fim*" id="data_fim">
              <Input
                type="date"
                id="data_fim"
                value={dataFim}
                required
                min={dataInicio || dayjs().add(1, "day").format("YYYY-MM-DD")}
                onChange={(e) => handleChangeDataFim(e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Horário*" id="horario">
              <Input
                type="time"
                id="horario"
                value={horario}
                required
                onChange={(e) => setHorario(e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Preço total" id="preco_total">
              <Input
                type="number"
                step="0.01"
                id="preco_total"
                value={preco_total}
                onChange={(e) => setPreco_total(Number(e.target.value))}
              />
            </FormGroup>

            <FormGroup label="Forma de pagamento" id="forma_pagamento">
              <SelectModificado
                id="forma_pagamento"
                value={forma_pagamento}
                onChange={(e) => setForma_pagamento(e.target.value)}
              >
                <option value="">Selecione</option>
                {formasPagamento.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </SelectModificado>
            </FormGroup>

            <FormGroup label="Observações" id="observacoes">
              <TextArea
                id="observacoes"
                value={observacoes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setObservacoes(e.target.value)
                }
              />
            </FormGroup>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                {erro}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              loading={loading}
            >
              Salvar
            </Button>
          </div>
        </form>
      )}

      {abrirModalProcuraClientes && (
        <ProcurarClientes
          setabrirModalProcuraClientes={setAbrirModalProcuraClientes}
          setCliente_id={setCliente_id}
          abrirModalProcuraClientes={abrirModalProcuraClientes}
          setEnderecos={setEnderecos}
          setDadosCliente={setDadosCliente}
        />
      )}
    </Modal>
  );
}

export default NovoAgendamento;
