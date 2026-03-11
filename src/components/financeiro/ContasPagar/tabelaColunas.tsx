import { ColunaConfig } from "@src/components/comum/TabelaDinamica";
import dayjs from "dayjs";

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
    key: "categoria",
    label: "CATEGORIA",
    render: (registro) => {
      const categoria = registro.categoria;

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
            <span>{categoria}</span>
          </div>
        </div>
      );
    },
  },
  {
    key: "valor",
    label: "VALOR",
    render: (registro) => registro.valor || "-",
  },
  {
    key: "status",
    label: "STATUS",
    render: (registro) => {
      const status = registro.status || "";

      return (
        <div className="flex justify-center">
          <div
            className={`flex items-center gap-2
            ${
              status.toLowerCase() === "concluido"
                ? "bg-green-600 text-white"
                : "bg-gradient-to-r from-[var(--corPrincipal)]/30 to-[var(--corPrincipal)]/20"
            }
            rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide shadow-md`}
          >
            <span>{status}</span>
          </div>
        </div>
      );
    },
  },
  {
    key: "data_movimentacao",
    label: "DATA",
    render: (registro) =>
      dayjs(registro.data_movimentacao).format("DD/MM/YYYY") ?? "-",
  },
];
