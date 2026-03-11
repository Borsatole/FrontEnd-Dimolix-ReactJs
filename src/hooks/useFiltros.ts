import { useState } from "react";

type Filtros = Record<string, any>;

export function useFiltro(filtrosIniciais: Filtros = {}) {

  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciais);

  function gerarQueryString() {
    const params = new URLSearchParams();

    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    return params.toString();
  }

  return {
    filtros,
    setFiltros,
    queryString: gerarQueryString(),
  };
}