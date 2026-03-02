import { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import Headermodal from "@src/components/comum/Tabelas/Headermodal";
import Footermodal from "@src/components/comum/Tabelas/Footermodal";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { Options, useCrudRegistro } from "@src/hooks/useCrudRegistro";
import { FormGroup } from "@src/components/comum/FormGroup";
import { Input } from "@src/components/comum/input";

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
  /* Campos Controlados */
  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const [recorrencia, setRecorrencia] = useState<number>(0);
  const [id_categoria, setId_categoria] = useState<number>(0);

  const { loading, handleSubmit, fecharModal } = useCrudRegistro({
    modo: config.modo,
    endpoint: config.endpoint,
    definicoes: config.definicoes,
  });

  const {
    registros,
    setRegistros,
    setRelistar,
    setLoadingSpiner,
    selectedRegistro,
    setSelectedRegistro,
  } = UseTabela();

  const registro = registros.find((p) => p.id === selectedRegistro?.id);

  useEffect(() => {
    if (registro) {
      setDescricao(registro.descricao);
      setValor(registro.valor);
      setRecorrencia(registro.recorrencia);
      setId_categoria(registro.id_categoria);
    }
  }, [selectedRegistro?.id]);

  const formData = {
    descricao,
    valor,
    recorrencia,
    id_categoria,
  };

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <form
        onSubmit={(e) => handleSubmit(e, formData)}
        className="flex flex-col gap-2"
      >
        <Headermodal
          icone={config.icone}
          titulo="Editar Registro"
          subtitulo="Edite o registro"
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
        <Footermodal loading={loading} />
      </form>
    </Modal>
  );
}
