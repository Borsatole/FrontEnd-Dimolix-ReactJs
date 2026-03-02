import { useState } from "react";
import { Create, Update } from "@src/services/crud2";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";

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
  const {
    selectedRegistro,
    setSelectedRegistro,
    setRelistar,
    setLoadingSpiner,
    setAbrirModalNovoRegistro,
    setAbrirModalEditarRegistro,
  } = UseTabela();

  const [loading, setLoading] = useState(false);
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
          setLoadingSpiner(true);
        },
        depoisDeExecutar: () => {
          setLoadingSpiner(false);
          setLoading(false);

          if (definicoes?.relistar) setRelistar(true);
          if (definicoes?.fecharModal) fecharModal();
        },
      });
    } catch {
      setLoading(false);
      setLoadingSpiner(false);
    }
  };

  const fecharModal = () => {
    setSelectedRegistro(null);
    setAbrirModalNovoRegistro(false);
    setAbrirModalEditarRegistro(false);
  };

  return {
    loading,
    handleSubmit,
    fecharModal,
  };
}
