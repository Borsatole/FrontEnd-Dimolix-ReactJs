import Modal from "@components/modal/Modal";
import Headermodal from "@src/components/comum/Tabelas/Headermodal";
import Footermodal from "@src/components/comum/Tabelas/Footermodal";
import { Options, useCrudRegistro } from "@src/hooks/useCrudRegistro";
import { useEffect, useState } from "react";
import { FormGroup } from "@src/components/comum/FormGroup";
import { Input } from "@src/components/comum/input";
import ErrorMessage from "@src/components/comum/Tabelas/ErrorMessage";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { SelectAtualizado } from "@src/components/comum/SelectAtualizado";
import { SwitchPadrao } from "@src/components/comum/SwitchPadrao";
import dayjs from "dayjs";

const config: Options = {
  modo: "create",
  endpoint: "/financeiro",
  icone: "financeiro",
  definicoes: {
    relistar: true,
    fecharModal: true,
  },
};

export default function ModalAdicionarRegistro() {
  const { data } = UseTabela();

  /* Campos Controlados */
  const [descricao, setDescricao] = useState<string>("");
  const [id_categoria, setId_categoria] = useState<string>("");
  const [data_movimentacao, setData_movimentacao] = useState<string | null>(
    dayjs().format("YYYY-MM-DD"),
  );
  const [valor, setValor] = useState<number>(0);
  const [tipo_movimentacao, setTipo_movimentacao] = useState<string>("entrada");
  const [forma_pagamento, setForma_Pagamento] = useState<string>("");
  const [dia_vencimento, setDia_Vencimento] = useState<number | null>(1);
  const [observacoes, setObservacoes] = useState<string>("");
  const [status, setStatus] = useState<string>("concluido");

  /* Erro */
  const [erro, setErro] = useState<string | null>(null);

  function validar() {
    if (!descricao.trim()) return "O campo descrição é obrigatório";
    if (valor <= 0) return "O valor deve ser maior que zero";
    if (!id_categoria) return "Categoria é obrigatória";
    if (!data_movimentacao) return "Data da movimentação é obrigatório";
    if (!forma_pagamento) return "Forma de pagamento é obrigatória";
    if (!status) return "Status é obrigatório";
    if (!tipo_movimentacao) return "Tipo de movimentação é obrigatório";

    return null;
  }

  const formData = {
    descricao,
    valor,
    id_categoria,
    forma_pagamento,
    dia_vencimento,
    data_movimentacao,
    tipo_movimentacao,
    observacoes,
    status,
  };

  const { loadingcrud, handleSubmit, fecharModal } = useCrudRegistro({
    modo: "create",
    endpoint: config.endpoint,
    definicoes: config.definicoes,
  });

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const erro = validar();

          if (erro) {
            setErro(erro);
            return;
          }

          handleSubmit(e, formData);
        }}
        className="flex flex-col"
      >
        <Headermodal
          icone={config.icone}
          titulo="Novo Registro"
          subtitulo="Crie um novo registro"
        />
        {erro && <ErrorMessage message={erro} />}
        <div className="bg-[var(--base-variant)] p-4">
          <FormGroup label="Descricao" id="descricao">
            <Input
              type="text"
              name="descricao"
              id="descricao"
              value={descricao || ""}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </FormGroup>

          <FormGroup label="Categoria" id="id_categoria">
            <SelectAtualizado
              name="id_categoria"
              id="id_categoria"
              labelKey="categoria_item"
              valueKey="id"
              options={data?.categorias || []}
              value={id_categoria}
              onChange={(e) => setId_categoria(e.target.value)}
            />
          </FormGroup>

          <FormGroup label="Forma de pagamento" id="forma_pagamento">
            <SelectAtualizado
              name="forma_pagamento"
              id="forma_pagamento"
              options={data?.formasPagamento || []}
              value={forma_pagamento}
              onChange={(e) => setForma_Pagamento(e.target.value)}
            />
          </FormGroup>

          <FormGroup label="Valor" id="valor">
            <Input
              type="number"
              name="valor"
              id="valor"
              value={valor || ""}
              onChange={(e) => setValor(Number(e.target.value))}
            />
          </FormGroup>

          <FormGroup label="Data da movimentação" id="data_movimentacao">
            <Input
              type="date"
              name="data_movimentacao"
              id="data_movimentacao"
              value={data_movimentacao || ""}
              onChange={(e) => setData_movimentacao(e.target.value)}
            />
          </FormGroup>

          <FormGroup label="Status da conta" id="status">
            <div
              className={`
              flex items-center justify-between p-3 rounded-lg border-3 border-[var(--base-color)] bg-[var(--base-variant)]`}
            >
              <span
                className={`text-sm font-medium ${
                  status === "concluido" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {status === "concluido" ? "Conta Recebida" : "Conta pendente"}
              </span>

              <SwitchPadrao
                checked={status === "concluido"}
                onChange={(checked) =>
                  setStatus(checked ? "concluido" : "pendente")
                }
              />
            </div>
          </FormGroup>
        </div>

        <Footermodal loading={loadingcrud} />
      </form>
    </Modal>
  );
}

interface BtnSelectMesProps {
  texto: string;
  value: number;
  recorrenciaAtual?: number;
  onClick: () => void;
}

export function BtnSelectMes({
  texto,
  value,
  recorrenciaAtual,
  onClick,
}: BtnSelectMesProps) {
  const selecionado = Number(recorrenciaAtual) === Number(value);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer ${
        selecionado
          ? "bg-[var(--corPrincipal)] text-white border-[var(--corPrincipal)]"
          : "bg-[var(--base-variant)] border-[var(--base-color)]"
      } p-2 text-sm border-2 rounded-2xl`}
    >
      {texto}
    </button>
  );
}
