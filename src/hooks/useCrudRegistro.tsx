import { useState } from "react";
import { Create, Update } from "@src/services/crud2";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { useBuscarDados } from "./UseBuscarDadosTabela";

export type Options = {
  icone?: string;
  endpoint: string;
  modo: "create" | "update";
  definicoes?: {
    relistar?: boolean;
    fecharModal?: boolean;
  };
};

export function useCrudRegistro({ endpoint, modo, definicoes }: Options) {
  const { refresh } = UseTabela();
  const [loadingcrud, setLoadingCrud] = useState(false);
  const {
    selectedRegistro,
    setSelectedRegistro,
    setLoading,
    setAbrirModalNovoRegistro,
    setAbrirModalEditarRegistro,
  } = UseTabela();

  const endpointModificado =
    modo === "update" && selectedRegistro
      ? `${endpoint}/${selectedRegistro.id}`
      : endpoint;

  const handleSubmit = async (e: React.FormEvent, payload: any) => {
    e.preventDefault();

    try {
      const action = modo === "create" ? Create : Update;

      action<any>({
        payload,
        endpoint: endpointModificado,
        antesDeExecutar: () => {
          setLoading(true);
          setLoading(true);
        },
        depoisDeExecutar: () => {
          setLoading(false);
          setLoading(false);

          if (definicoes?.relistar) refresh();
          if (definicoes?.fecharModal) fecharModal();
        },
      });
    } catch {
      setLoading(false);
      setLoading(false);
    }
  };

  const fecharModal = () => {
    setSelectedRegistro(null);
    setAbrirModalNovoRegistro(false);
    setAbrirModalEditarRegistro(false);
  };

  return {
    loadingcrud,
    handleSubmit,
    fecharModal,
  };
}
