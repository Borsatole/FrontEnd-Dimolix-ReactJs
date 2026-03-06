import { useState } from "react";
import { montarQuery } from "@src/utils/montarQuery";

export function useFiltros<T extends Record<string, any>>(
  filtrosIniciais: T,
  onFiltrar: (query: string) => void,
) {
  const [filtros, setFiltros] = useState<T>(filtrosIniciais);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function aplicarFiltros() {
    const query = montarQuery(filtros);
    onFiltrar(query);
  }

  function limparFiltros() {
    setFiltros(filtrosIniciais);
    onFiltrar("");
  }

  function filtrosAtivos() {
    return Object.values(filtros).filter(
      (v) => v !== undefined && v !== null && v.toString().trim() !== "",
    ).length;
  }

  return {
    filtros,
    setFiltros,
    handleChange,
    aplicarFiltros,
    limparFiltros,
    filtrosAtivos: filtrosAtivos(),
  };
}