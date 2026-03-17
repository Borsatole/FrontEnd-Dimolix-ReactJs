import { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import Headermodal from "@src/components/comum/Tabelas/Headermodal";
import Footermodal from "@src/components/comum/Tabelas/Footermodal";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { Options, useCrudRegistro } from "@src/hooks/useCrudRegistro";
import { FormGroup } from "@src/components/comum/FormGroup";
import { Input } from "@src/components/comum/input";
import { SelectModificado } from "@src/components/comum/select";
import ErrorMessage from "@src/components/comum/Tabelas/ErrorMessage";
import { BtnSelectMes } from "./NovoRegistro";
import { SelectAtualizado } from "@src/components/comum/SelectAtualizado";
import CalendarDays from "./CalendarDays";
import { Alert } from "flowbite-react";

const config: Options = {
  endpoint: "/financeiro-contas-fixas",
  modo: "update",
  icone: "contasfixas",
  definicoes: {
    relistar: true,
    fecharModal: true,
  },
};

export default function ModalEditarRegistro() {
  const {
    data,
    registros,
    setRegistros,
    selectedRegistro,
    setSelectedRegistro,
  } = UseTabela();

  const [mostrarRecorrencia, setMostrarRecorrencia] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<any[]>([]);

  /* Campos Controlados */
  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const [recorrencia, setRecorrencia] = useState<number>(1);
  const [id_categoria, setId_categoria] = useState<string>("");
  const [forma_pagamento, setForma_Pagamento] = useState<string>("");
  const [dia_vencimento, setDia_Vencimento] = useState<number | null>(1);
  const [data_fim, setData_fim] = useState<string | null>(null);

  /* Erro */
  const [erro, setErro] = useState<string | null>(null);

  function validar() {
    if (!descricao.trim()) return "O campo descrição é obrigatório";
    if (valor <= 0) return "O valor deve ser maior que zero";
    if (recorrencia < 1) return "Recorrência inválida";
    if (!id_categoria) return "Categoria é obrigatória";
    if (!forma_pagamento) return "Forma de pagamento é obrigatória";
    if (!dia_vencimento) return "Dia de vencimento é obrigatório";

    return null;
  }

  const { loadingcrud, handleSubmit, fecharModal } = useCrudRegistro({
    modo: config.modo,
    endpoint: config.endpoint,
    definicoes: config.definicoes,
  });

  const registro = registros.find((p) => p.id === selectedRegistro?.id);

  useEffect(() => {
    if (registro) {
      setDescricao(registro.descricao);
      setValor(registro.valor);
      setRecorrencia(registro.recorrencia);
      setId_categoria(registro.id_categoria);
      setForma_Pagamento(registro.forma_pagamento);
      setDia_Vencimento(registro.dia_vencimento);
      setData_fim(registro.data_fim);
    }
  }, [selectedRegistro?.id]);

  const formData = {
    descricao,
    valor,
    recorrencia,
    id_categoria,
    forma_pagamento,
    dia_vencimento,
    data_fim,
  };

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
        className="flex flex-col gap-2"
      >
        <Headermodal
          icone={config.icone}
          titulo="Editar Registro"
          subtitulo="Edite o registro"
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

          <FormGroup label="Valor" id="valor">
            <Input
              type="number"
              name="valor"
              id="valor"
              value={valor || ""}
              onChange={(e) => setValor(Number(e.target.value))}
            />
          </FormGroup>

          <FormGroup label="Recorrencia" id="valor">
            <div className="gap-1 grid grid-cols-1 sm:grid-cols-3 justify-start items-center">
              <BtnSelectMes
                texto="a cada mês"
                value={1}
                recorrenciaAtual={recorrencia}
                onClick={() => setRecorrencia(1)}
              />

              <BtnSelectMes
                texto="a cada ano"
                value={12}
                recorrenciaAtual={recorrencia}
                onClick={() => setRecorrencia(12)}
              />

              <BtnSelectMes
                texto="a cada 3 meses"
                value={3}
                recorrenciaAtual={recorrencia}
                onClick={() => setRecorrencia(3)}
              />

              <BtnSelectMes
                texto="a cada 6 meses"
                value={6}
                recorrenciaAtual={recorrencia}
                onClick={() => setRecorrencia(6)}
              />

              <BtnSelectMes
                texto="Personalizado"
                value={6}
                onClick={() => setMostrarRecorrencia(!mostrarRecorrencia)}
              />
            </div>
          </FormGroup>

          <FormGroup
            label="Recorrencia"
            id="recorrencia"
            className={`${mostrarRecorrencia ? "" : "hidden"}`}
          >
            <Input
              type="number"
              name="recorrencia"
              id="recorrencia"
              value={recorrencia || ""}
              onChange={(e) => setRecorrencia(Number(e.target.value))}
            />
          </FormGroup>

          <FormGroup label="Dia de vencimento" id="dia_vencimento">
            <CalendarDays
              daySelecionado={dia_vencimento}
              setDay={setDia_Vencimento}
            />
          </FormGroup>

          <FormGroup label="Data Final" id="data_fim">
            <Input
              type="date"
              name="data_fim"
              id="data_fim"
              value={data_fim || ""}
              onChange={(e) => setData_fim(e.target.value)}
            />

            <Alert color="warning" className="mt-3 p-4">
              <span className="text-sm font-semibold">Atenção: </span>
              <span className="text-xs">
                Caso não houver data final, se repetirá o lançamento sem uma
                data limite.
              </span>
            </Alert>
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
        </div>
        <Footermodal loading={loadingcrud} />
      </form>
    </Modal>
  );
}
