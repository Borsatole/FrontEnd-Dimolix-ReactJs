import { ColunaConfig } from "@src/components/comum/TabelaDinamica";
import dayjs from "dayjs";
import { HiOutlineRefresh } from "react-icons/hi";

export const colunas: ColunaConfig<any>[] = [
  {
    key: "id",
    label: "ID",
    render: (registro) => registro.id || "-",
  },
  {
    key: "descricao",
    label: "DESCRICAO",
    render: (registro) => registro.descricao ?? "-",
  },
  {
    key: "valor",
    label: "VALOR",
    render: (registro) => registro.valor || "-",
  },
  {
    key: "recorrencia",
    label: "RECORRENCIA",
    render: (registro) => {
      const recorrencia = registro.recorrencia;

      return (
        <div className="flex justify-center">
          <div
            className="flex items-center gap-2 
                      bg-gradient-to-r 
                      from-[var(--corPrincipal)]/30 
                      to-[var(--corPrincipal)]/20
                      
                      rounded-full 
                      px-4 py-1.5 
                      text-xs font-semibold 
                      uppercase tracking-wide 
                      shadow-md"
          >
            <HiOutlineRefresh className="text-sm" />
            <span>
              {recorrencia} {Number(recorrencia) === 1 ? "mês" : "meses"}
            </span>
          </div>
        </div>
      );
    },
  },
];
