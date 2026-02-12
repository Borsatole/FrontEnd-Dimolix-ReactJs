import { useState, useEffect } from "react";
import { getIcon } from "@src/components/icons";

import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { SelectModificado } from "@src/components/comum/select";
import {
  Cliente,
  DadosLocacao,
  Endereco,
  GrupoEstoque,
  ItemEstoque,
} from "@src/components/tipos";
import { LuUserRoundSearch } from "react-icons/lu";
import ProcurarClientes from "./ProcuraClientes";
import BotaoSeletor from "../comum/buttonSelected";
import { Update } from "@src/services/crud2";
import dayjs from "dayjs";
import { useEstoque } from "@src/context/EstoqueContext";
import Alerta from "../comum/alertas";

interface Locacao {
  id: number;
  cliente_id: number;
  locacao_item_id: number;
  endereco_id: number;
  data_inicio: string;
  data_fim: string;
  preco_total: number;
  forma_pagamento: string;
  observacoes: string;
  cliente?: Cliente;
  endereco?: Endereco;
}

function ModalEditarRegistro() {
  const {
    registros,
    setRegistros,
    setRelistar,
    setLoadingSpiner,
    selectedRegistro,
    setSelectedRegistro,
    abrirModalEditarRegistro,
    setAbrirModalEditarRegistro,
  } = useEstoque();

  const [isLoading, setIsLoading] = useState(false);
  const [locacaoAtual, setLocacaoAtual] = useState<ItemEstoque | null>(null);

  // dados
  const [dadosCliente, setDadosCliente] = useState<Cliente | null>(null);
  const [cliente_id, setCliente_id] = useState<number | null>(null);
  const [locacao_item_id, setLocacao_item_id] = useState<number>();
  const [endereco_id, setEndereco_id] = useState<number | null>(null);
  const [data_inicio, setData_inicio] = useState<string>("");
  const [data_fim, setData_fim] = useState<string>("");
  const [preco_total, setPreco_total] = useState<number | null>(null);
  const [forma_pagamento, setForma_pagamento] = useState<string>("");
  const [observacoes, setObservacoes] = useState<string>("");

  const [date, setDate] = useState<Date | null>(null);

  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [enderecoSelecionado, setEnderecoSelecionado] =
    useState<Endereco | null>(null);

  const [abrirModalProcuraClientes, setabrirModalProcuraClientes] =
    useState(false);

  const formasPagamento = [
    { id: 1, label: "dinheiro" },
    { id: 2, label: "credito" },
    { id: 3, label: "debito" },
    { id: 4, label: "pix" },
    { id: 5, label: "outro" },
  ];

  useEffect(() => {
    if (!selectedRegistro) return;
    setLocacaoAtual(selectedRegistro);
  }, [selectedRegistro]);

  // Preenche todos os estados quando abre o modal
  useEffect(() => {
    if (!abrirModalEditarRegistro || !selectedRegistro) return;

    const dados = selectedRegistro.dados_locacao;

    if (!dados) return;

    // Cliente
    const clienteObj: Cliente = {
      id: Number(dados.cliente_id),
      nome: dados.cliente_nome || "",
      telefone: dados.cliente_telefone || "",
      email: "",
      celular: "",
      enderecos: [
        {
          id: Number(dados.endereco_id),
          logradouro: dados.logradouro,
          numero: dados.numero,
          bairro: dados.bairro,
          cidade: dados.cidade,
          estado: dados.estado,
          cep: dados.cep,
          complemento: dados.complemento || "",
        },
      ],
    };

    setDadosCliente(clienteObj);
    setCliente_id(Number(dados.cliente_id));

    // Endereços
    const enderecoObj: Endereco = {
      id: Number(dados.endereco_id),
      logradouro: dados.logradouro,
      numero: dados.numero,
      bairro: dados.bairro,
      cidade: dados.cidade,
      estado: dados.estado,
      cep: dados.cep,
      complemento: dados.complemento || "",
    };

    setEnderecos([enderecoObj]);
    setEnderecoSelecionado(enderecoObj);
    setEndereco_id(Number(dados.endereco_id));

    // Outras informações da locação
    setLocacao_item_id(Number(dados.locacao_item_id));
    setData_inicio(dayjs(dados.data_inicio).format("YYYY-MM-DD"));
    setData_fim(dayjs(dados.data_fim).format("YYYY-MM-DD"));
    setPreco_total(Number(dados.preco_total));
    setForma_pagamento(dados.forma_pagamento || "");
    setObservacoes(dados.observacoes || "");
  }, [abrirModalEditarRegistro, selectedRegistro]);

  useEffect(() => {
    if (!dadosCliente) return;

    setDadosCliente(dadosCliente);
    setCliente_id(Number(dadosCliente?.id));
    setEnderecos(dadosCliente?.enderecos || []);
  }, [dadosCliente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cliente_id) {
      Alerta("toast", "error", "Selecione um cliente");
      return;
    }

    if (!endereco_id) {
      Alerta("toast", "error", "Selecione um endereço");
      return;
    }

    if (!data_inicio) {
      Alerta("toast", "error", "Selecione uma data de inicio");
      return;
    }

    if (!data_fim) {
      Alerta("toast", "error", "Selecione uma data de fim");
      return;
    }

    if (!preco_total) {
      Alerta("toast", "error", "Digite um valor valido");
      return;
    }

    if (!forma_pagamento) {
      Alerta("toast", "error", "Selecione uma forma de pagamento");
      return;
    }

    const payload = {
      //   cliente_id,
      //   locacao_item_id,
      //   endereco_id,
      data_inicio,
      data_fim,
      preco_total,
      forma_pagamento,
      observacoes: observacoes.trim(),
    };

    try {
      Update<any>({
        payload,
        endpoint: `/locacoes/${locacaoAtual?.dados_locacao?.locacao_id}`,
        antesDeExecutar: () => {
          setIsLoading(true);
          setLoadingSpiner(true);
        },
        depoisDeExecutar: () => {
          setLoadingSpiner(false);
          setAbrirModalEditarRegistro(false);
          setRelistar(true);
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setAbrirModalEditarRegistro(false);
  };

  if (!abrirModalEditarRegistro) return null;
  if (!selectedRegistro) return null;
  if (!dadosCliente) return null;

  return (
    <Modal IsOpen={true} onClose={handleClose} className="min-h-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup label="Cliente" id="cliente">
          {locacaoAtual ? (
            <div className="bg-[var(--base-color)] rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {dadosCliente.nome}
                    </h3>
                    {dadosCliente.razao_social && (
                      <p className="text-sm">{dadosCliente.razao_social}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {dadosCliente.telefone && (
                      <div>
                        <span className="text-gray-500 font-medium">
                          Telefone:
                        </span>
                        <p className="text-gray-700">{dadosCliente.telefone}</p>
                      </div>
                    )}
                    {dadosCliente.celular && (
                      <div>
                        <span className="text-gray-500 font-medium">
                          Celular:
                        </span>
                        <p className="text-gray-700">{dadosCliente.celular}</p>
                      </div>
                    )}
                    {dadosCliente.email && (
                      <div className="col-span-2">
                        <span className="text-gray-500 font-medium">
                          Email:
                        </span>
                        <p className="text-gray-700">{dadosCliente.email}</p>
                      </div>
                    )}
                    {dadosCliente.enderecos && (
                      <div className="col-span-2">
                        <span className="text-gray-500 font-medium">
                          Endereço:
                        </span>
                        <p className="text-gray-700">
                          {dadosCliente.enderecos
                            .map((endereco) => endereco.logradouro)
                            .join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setabrirModalProcuraClientes(true)}
              className="w-full rounded-lg border-2 border-dashed
                bg-[var(--base-variant)] hover:bg-[var(--base-color)] transition-all duration-200 py-8"
            >
              <div className="flex flex-col items-center gap-2">
                <LuUserRoundSearch size={32} />
                <span className="font-medium">Selecionar Cliente</span>
              </div>
            </button>
          )}
        </FormGroup>

        {dadosCliente && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormGroup id="data_inicio" label="Data Início">
                <Input
                  id="data_inicio"
                  type="date"
                  name="data_inicio"
                  value={data_inicio}
                  onChange={(e) => setData_inicio(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Data Fim" id="data_fim">
                <Input
                  id="data_fim"
                  type="date"
                  name="data_fim"
                  value={data_fim}
                  onChange={(e) => setData_fim(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Valor" id="valor">
                <Input
                  id="valor"
                  type="number"
                  name="valor"
                  value={preco_total || ""}
                  onChange={(e) => setPreco_total(Number(e.target.value))}
                />
              </FormGroup>

              <FormGroup label="Forma de Pagamento" id="forma_pagamento">
                <SelectModificado
                  id="forma_pagamento"
                  name="forma_pagamento"
                  value={forma_pagamento}
                  onChange={(e) => setForma_pagamento(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {formasPagamento.map((formaPagamento) => (
                    <option
                      key={formaPagamento.id}
                      value={formaPagamento.label}
                    >
                      {formaPagamento.label}
                    </option>
                  ))}
                </SelectModificado>
              </FormGroup>

              <FormGroup
                label="Observação"
                id="observacao"
                className="col-span-2"
              >
                <TextArea
                  id="observacao"
                  name="observacao"
                  value={observacoes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setObservacoes(e.target.value)
                  }
                />
              </FormGroup>
            </div>
          </>
        )}

        <div className="flex justify-between gap-2">
          <Button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-600"
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button type="submit" loading={isLoading} disabled={isLoading}>
            <p className="flex items-center gap-2">
              {getIcon("salvar", 20)}
              <span>Salvar Alterações</span>
            </p>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalEditarRegistro;
