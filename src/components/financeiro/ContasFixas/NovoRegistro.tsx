import Modal from "@components/modal/Modal";
import Headermodal from "@src/components/comum/Tabelas/Headermodal";
import Footermodal from "@src/components/comum/Tabelas/Footermodal";
import { Options, useCrudRegistro } from "@src/hooks/useCrudRegistro";
import { useState } from "react";
import { FormGroup } from "@src/components/comum/FormGroup";
import { Input } from "@src/components/comum/input";
import ErrorMessage from "@src/components/comum/Tabelas/ErrorMessage";

const config: Options = {
  modo: "create",
  endpoint: "/financeiro-contas-fixas",
  icone: "contasfixas",
  definicoes: {
    relistar: true,
    fecharModal: true,
  },
};

export default function ModalAdicionarRegistro() {
  /* Campos Controlados */
  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const [recorrencia, setRecorrencia] = useState<number>(0);
  const [id_categoria, setId_categoria] = useState<number>(0);

  /* Erro */
  const [erro, setErro] = useState<string | null>(null);

  function validar() {
    if (!descricao.trim()) return "O campo descrição é obrigatório";
    if (valor <= 0) return "O valor deve ser maior que zero";
    if (recorrencia <= 0) return "Recorrência inválida";
    // if (!id_categoria) return "Categoria é obrigatória";

    return null;
  }

  const formData = {
    descricao,
    valor,
    recorrencia,
    id_categoria,
  };

  const { loading, handleSubmit, fecharModal } = useCrudRegistro({
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

        <div className="bg-[var(--base-variant)] p-4">
          <FormGroup label="Nome" id="nome">
            <Input
              type="text"
              name="nome"
              id="nome"
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

          <FormGroup label="Recorrencia" id="recorrencia">
            <Input
              type="number"
              name="recorrencia"
              id="recorrencia"
              value={recorrencia || ""}
              onChange={(e) => setRecorrencia(Number(e.target.value))}
            />
          </FormGroup>
        </div>

        {erro && <ErrorMessage message={erro} />}
        <Footermodal loading={loading} />
      </form>
    </Modal>
  );
}
