import { useState } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Button } from "@components/comum/button";
import { getIcon } from "@src/components/icons";
import { Update } from "@src/services/crud2";
import { UseContasFixas } from "@src/context/ContasFixasContext";
import {
  FormBuilder,
  Campo,
  initFormDataFromRegistro,
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
      options: { type: "text", required: true },
    },
    {
      label: "Categorias",
      name: "id_categoria",
      campo: "select",
      opcoes: [
        { label: "Combustivel", value: 1 },
        { label: "Semanais", value: 2 },
        { label: "Mensais", value: 3 },
      ],
      options: { required: true },
    },
    {
      label: "Valor",
      name: "valor",
      campo: "input",
      options: { type: "number", required: true },
    },
    {
      label: "Recorrencia (meses)",
      name: "recorrencia",
      campo: "input",
      options: { type: "number", required: true },
    },
    {
      label: "Dia Vencimento",
      name: "dia_vencimento",
      campo: "input",
      options: { type: "number", required: true },
    },
    {
      label: "Data Fim",
      name: "data_fim",
      campo: "input",
      options: { type: "date" },
    },
  ],
  definicoes: { relistar: true },
};

export default function ModalEditarRegistro() {
  const {
    registros,
    setRegistros,
    setRelistar,
    setLoadingSpiner,
    selectedRegistro,
    setSelectedRegistro,
  } = UseTabela();

  const registro = registros.find((p) => p.id === selectedRegistro?.id);

  const [formData, setFormData] = useState<Record<string, any>>(() =>
    initFormDataFromRegistro(config.campos, registro ?? {}),
  );

  const [loading, setIsLoading] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegistro?.id) return;

    try {
      Update<any>({
        payload: formData,
        registros,
        setRegistros,
        endpoint: `${config.endpoint}/${selectedRegistro.id}`,
        antesDeExecutar: () => {
          setIsLoading(true);
          setLoadingSpiner(true);
        },
        depoisDeExecutar: () => {
          setSelectedRegistro(null);
          setLoadingSpiner(false);
          setIsLoading(false);
          if (config.definicoes.relistar) setRelistar(true);
        },
      });
    } catch {
      setIsLoading(false);
      setLoadingSpiner(false);
    }
  };

  const fecharModal = () => setSelectedRegistro(null);

  if (!selectedRegistro) return null;

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Headermodal
          icone={config.icone}
          titulo="Editar Registro"
          subtitulo="Edite o registro"
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
