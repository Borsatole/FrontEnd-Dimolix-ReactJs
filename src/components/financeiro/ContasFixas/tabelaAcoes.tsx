import { AcaoConfig } from "@src/components/comum/TabelaDinamica";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { getIcon } from "@src/components/icons";
import { Delete } from "@src/services/crud2";

interface AcoesProps {
  endpoint: string;
}

export function useTabelaAcoes({ endpoint }: AcoesProps): AcaoConfig<any>[] {
  const {
    registros,
    setRegistros,
    setLoading,
    setSelectedRegistro,
    refresh,

    setAbrirModalEditarRegistro,
  } = UseTabela();
  return [
    {
      icon: <div className="cursor-pointer">{getIcon("editar", 20)}</div>,
      tooltip: "Editar",
      onClick: (registro) => {
        setSelectedRegistro(registro);
        setAbrirModalEditarRegistro(true);
      },
    },
    {
      icon: <div className="cursor-pointer">{getIcon("deletar", 20)}</div>,
      tooltip: "Excluir",
      onClick: (registro) => {
        Delete({
          registro,
          registros,
          setRegistros,
          endpoint: `${endpoint}/${registro.id}`,
          antesDeExecutar: () => setLoading(true),
          depoisDeExecutar: () => {
            setLoading(false);
            refresh();
          },
        });

        setSelectedRegistro(null);
      },
    },
  ];
}
