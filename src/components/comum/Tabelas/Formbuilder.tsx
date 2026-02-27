import { FormGroup } from "@src/components/comum/FormGroup";
import { Input, TextArea } from "@src/components/comum/input";
import { SelectModificado } from "@src/components/comum/select";

// -------------------------------------------------------
// Tipos exportados para uso nos configs dos modais
// -------------------------------------------------------

type CampoBase = {
  label: string;
  name: string;
  defaultValue?: any;
  options?: Record<string, any>;
};

export type CampoInput = CampoBase & { campo: "input" };
export type CampoTextArea = CampoBase & { campo: "textarea" };
export type CampoSelect = CampoBase & {
  campo: "select";
  opcoes?: Array<{ label: string; value: any }>;
};

export type Campo = CampoInput | CampoTextArea | CampoSelect;

// -------------------------------------------------------
// Helper interno: sanitiza valor conforme o tipo do campo
// -------------------------------------------------------

function sanitizarValor(campo: Campo, valor: any): any {
  // Campos de data precisam estar no formato yyyy-MM-dd
  // Valores como "0000-00-00", null, undefined ou inválidos viram string vazia
  if (campo.campo === "input" && campo.options?.type === "date") {
    if (!valor || valor === "0000-00-00") return "";

    const data = new Date(valor);
    if (isNaN(data.getTime())) return "";

    // Garante formato yyyy-MM-dd sem problemas de timezone
    return valor.slice(0, 10);
  }

  return valor ?? "";
}

// -------------------------------------------------------
// Props
// -------------------------------------------------------

type FormBuilderProps = {
  campos: Campo[];
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
  disabled?: boolean;
};

// -------------------------------------------------------
// Componente
// -------------------------------------------------------

export function FormBuilder({
  campos,
  formData,
  onChange,
  disabled = false,
}: FormBuilderProps) {
  return (
    <>
      {campos.map((campo) => {
        if (campo.campo === "input") {
          return (
            <FormGroup label={campo.label} key={campo.name} id={campo.name}>
              <Input
                id={campo.name}
                disabled={disabled}
                value={formData[campo.name] ?? ""}
                onChange={(e) => onChange(campo.name, e.target.value)}
                {...campo.options}
              />
            </FormGroup>
          );
        }

        if (campo.campo === "textarea") {
          return (
            <FormGroup label={campo.label} key={campo.name} id={campo.name}>
              <TextArea
                id={campo.name}
                disabled={disabled}
                value={formData[campo.name] ?? ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onChange(campo.name, e.target.value)
                }
                {...campo.options}
              />
            </FormGroup>
          );
        }

        if (campo.campo === "select") {
          return (
            <FormGroup label={campo.label} key={campo.name} id={campo.name}>
              <SelectModificado
                id={campo.name}
                disabled={disabled}
                value={formData[campo.name] ?? ""}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onChange(campo.name, e.target.value)
                }
                {...campo.options}
              >
                <option value="">Selecione uma opção</option>
                {campo.opcoes?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectModificado>
            </FormGroup>
          );
        }

        return null;
      })}
    </>
  );
}

// -------------------------------------------------------
// Helpers: inicializam formData a partir do config
// -------------------------------------------------------

// Para o modal de CRIAR — usa defaultValue dos campos
export function initFormData(campos: Campo[]): Record<string, any> {
  return Object.fromEntries(
    campos.map((campo) => [campo.name, campo.defaultValue ?? ""]),
  );
}

// Para o modal de EDITAR — usa os valores do registro existente
// Valores inválidos (ex: datas "0000-00-00") são sanitizados automaticamente
export function initFormDataFromRegistro(
  campos: Campo[],
  registro: Record<string, any>,
): Record<string, any> {
  return Object.fromEntries(
    campos.map((campo) => [
      campo.name,
      sanitizarValor(campo, registro[campo.name]),
    ]),
  );
}
