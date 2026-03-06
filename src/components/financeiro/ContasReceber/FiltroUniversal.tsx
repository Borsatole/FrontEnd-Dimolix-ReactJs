import { useState } from "react";
import { FormGroup } from "@components/comum/FormGroup";
import { Input } from "@components/comum/input";
import { SelectAtualizado } from "@src/components/comum/SelectAtualizado";
import { FaFilter, FaEraser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CaixaExpansora } from "@src/components/comum/CaixaExpansora";

// Tipos de campo suportados
type CampoBase = {
  name: string;
  label: string;
  defaultValue?: string;
};

type CampoText = CampoBase & { type: "text" };
type CampoDate = CampoBase & { type: "date" };
type CampoSelect = CampoBase & {
  type: "select";
  options: Record<string, any>[];
  labelKey: string;
  valueKey: string;
};

export type CampoFiltro = CampoText | CampoDate | CampoSelect;

interface FiltroUniversalProps {
  onFiltrar: (queryString: string) => void;
  campos: CampoFiltro[];
  titulo?: string;
  expandir?: boolean;
  conlunas?: number;
}

export function FiltroUniversal({
  onFiltrar,
  campos,
  titulo = "Filtros",
  expandir = true,
  conlunas = 3,
}: FiltroUniversalProps) {
  const [expandido, setExpandido] = useState(expandir);

  // Inicializa o estado dinamicamente baseado nos campos recebidos
  const estadoInicial = campos.reduce(
    (acc, campo) => ({ ...acc, [campo.name]: campo.defaultValue ?? "" }),
    {} as Record<string, string>,
  );

  const [filtros, setFiltros] = useState<Record<string, string>>(estadoInicial);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltrar = () => {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value.trim() !== "") params.append(key, value);
    });
    onFiltrar(params.toString());
  };

  const handleLimpar = () => {
    setFiltros(estadoInicial);
    onFiltrar("");
  };

  const filtrosAtivos = Object.values(filtros).filter(
    (v) =>
      v.trim() !== "" && v !== (campos.find(() => true)?.defaultValue ?? ""),
  ).length;

  const renderCampo = (campo: CampoFiltro) => {
    if (campo.type === "select") {
      return (
        <SelectAtualizado
          name={campo.name}
          id={campo.name}
          labelKey={campo.labelKey}
          valueKey={campo.valueKey}
          options={campo.options}
          value={filtros[campo.name]}
          onChange={handleChange}
        />
      );
    }

    return (
      <Input
        type={campo.type} // "text" | "date"
        id={campo.name}
        name={campo.name}
        value={filtros[campo.name]}
        onChange={handleChange}
        className="w-full"
      />
    );
  };

  return (
    <CaixaExpansora defaultExpandido={expandido} titulo="Filtros">
      <div
        className={`transition-all duration-300 ease-in-out ${expandido ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <form className="p-6 pt-2" onSubmit={(e) => e.preventDefault()}>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${conlunas} gap-4`}
          >
            {campos.map((campo) => (
              <FormGroup key={campo.name} id={campo.name} label={campo.label}>
                {renderCampo(campo)}
              </FormGroup>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--base-color)] flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleLimpar}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--base-color)] hover:bg-[var(--base-color)]/70 text-[var(--text-color)] font-medium transition-all duration-200 transform hover:scale-105"
            >
              <FaEraser className="text-sm" />
              Limpar
            </button>
            <button
              type="submit"
              onClick={handleFiltrar}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--corPrincipal)] hover:brightness-110 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <FaFilter className="text-sm" />
              Aplicar Filtros
            </button>
          </div>
        </form>
      </div>
    </CaixaExpansora>
  );
}
