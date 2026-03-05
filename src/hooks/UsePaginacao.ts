import { useState, useCallback, useEffect } from "react";

interface UsePaginacaoOptions {
  limiteInicial?: number;
}

export function usePaginacao({ limiteInicial = 20 }: UsePaginacaoOptions = {}) {
  const [pagina, setPagina] = useState(1);
  const [queryFiltro, setQueryFiltro] = useState("");
  const [limitePorPagina, setLimitePorPagina] = useState(limiteInicial);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);

  


  return {
    // estados
    pagina,
    limitePorPagina,
    totalPaginas,
    totalResultados,
    queryFiltro,

    // setters
    setPagina,
    setLimitePorPagina,
    setTotalPaginas,
    setTotalResultados,
    setQueryFiltro,
  };
}
