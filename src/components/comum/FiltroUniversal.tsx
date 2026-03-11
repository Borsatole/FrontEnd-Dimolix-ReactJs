import { FormGroup } from "@components/comum/FormGroup";
import { Input } from "@components/comum/input";
import { SelectAtualizado } from "@src/components/comum/SelectAtualizado";
import { FaFilter, FaEraser } from "react-icons/fa";
import { CaixaExpansora } from "@src/components/comum/CaixaExpansora";

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
  filtros: Record<string, any>;
  setFiltros: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  campos: CampoFiltro[];
  titulo?: string;
  expandir?: boolean;
  colunas?: number;
}

export function FiltroUniversal({
  filtros,
  setFiltros,
  campos,
  titulo = "Filtros",
  expandir = true,
  colunas = 3,
}: FiltroUniversalProps) {
  const gridCols: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLimpar = () => {
    const reset = campos.reduce(
      (acc, campo) => ({
        ...acc,
        [campo.name]: campo.defaultValue ?? "",
      }),
      {},
    );

    setFiltros((prev) => ({
      ...prev,
      ...reset,
    }));
  };

  const renderCampo = (campo: CampoFiltro) => {
    if (campo.type === "select") {
      return (
        <SelectAtualizado
          name={campo.name}
          id={campo.name}
          labelKey={campo.labelKey}
          valueKey={campo.valueKey}
          options={campo.options}
          value={filtros[campo.name] ?? ""}
          onChange={handleChange}
        />
      );
    }

    return (
      <Input
        type={campo.type}
        id={campo.name}
        name={campo.name}
        value={filtros[campo.name] ?? ""}
        onChange={handleChange}
        className="w-full"
      />
    );
  };

  return (
    <CaixaExpansora defaultExpandido={expandir} titulo={titulo}>
      <form className="p-6 pt-2" onSubmit={(e) => e.preventDefault()}>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            gridCols[colunas]
          } gap-4`}
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--base-color)] hover:bg-[var(--base-color)]/70 text-[var(--text-color)] font-medium"
          >
            <FaEraser />
            Limpar
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--corPrincipal)] text-white font-medium"
          >
            <FaFilter />
            Aplicar Filtros
          </button>
        </div>
      </form>
    </CaixaExpansora>
  );
}
