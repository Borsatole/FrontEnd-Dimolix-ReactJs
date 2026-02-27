import { useState } from "react";
import Modal from "@components/modal/Modal";
import { Button } from "@components/comum/button";
import { getIcon } from "@src/components/icons";
import { Create } from "@src/services/crud2";
import { UseContasFixas } from "@src/context/ContasFixasContext";
import {
  FormBuilder,
  Campo,
  initFormData,
} from "@src/components/comum/Tabelas/Formbuilder";
import Headermodal from "@src/components/comum/Tabelas/Headermodal";
import Footermodal from "@src/components/comum/Tabelas/Footermodal";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";

type Config = {
  endpoint: string;
  campos: Campo[];
  icone?: string;
  definicoes: { relistar?: boolean };
};

const config: Config = {
  endpoint: "/financeiro-contas-fixas",
  icone: "contasfixas",
  campos: [
    {
      label: "Descricao",
      name: "descricao",
      campo: "input",
      defaultValue: "",
      options: { type: "text", required: true },
    },
    {
      label: "Categorias",
      name: "id_categoria",
      campo: "select",
      opcoes: [
        { label: "Diarias", value: 1 },
        { label: "Semanais", value: 2 },
        { label: "Mensais", value: 3 },
      ],
      options: { required: true },
    },
    {
      label: "Valor",
      name: "valor",
      campo: "input",
      defaultValue: "",
      options: { type: "number", required: true },
    },
    {
      label: "Recorrencia",
      name: "recorrencia",
      campo: "input",
      defaultValue: "",
      options: { type: "number", required: true },
    },
    {
      label: "Dia Vencimento",
      name: "dia_vencimento",
      campo: "input",
      defaultValue: "",
      options: { type: "number", required: true },
    },
    {
      label: "Data Fim",
      name: "data_fim",
      campo: "input",
      defaultValue: "",
      options: { type: "date" },
    },
  ],
  definicoes: { relistar: true },
};

export default function ModalAdicionarRegistro() {
  const { setRelistar, setLoadingSpiner, setAbrirModalNovoRegistro } =
    UseTabela();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => initFormData(config.campos));

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      Create<any>({
        payload: formData,
        endpoint: config.endpoint,
        antesDeExecutar: () => {
          setLoading(true);
          setLoadingSpiner(true);
        },
        depoisDeExecutar: () => {
          setAbrirModalNovoRegistro(false);
          setLoadingSpiner(false);
          setLoading(false);
          if (config.definicoes.relistar) setRelistar(true);
        },
      });
    } catch {
      setLoading(false);
      setLoadingSpiner(false);
    }
  };

  const fecharModal = () => setAbrirModalNovoRegistro(false);

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Headermodal
          icone={config.icone}
          titulo="Novo Registro"
          subtitulo="Crie um novo registro"
        />
        <div className="bg-[var(--base-variant)] p-4">
          <FormBuilder
            campos={config.campos}
            formData={formData}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <Footermodal loading={loading} />
      </form>
    </Modal>
  );
}
