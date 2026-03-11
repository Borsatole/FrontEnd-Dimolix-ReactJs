import { useEffect, useState, useCallback } from "react";
import { Read } from "@src/services/crud2"; // ajuste para seu serviço
import { usePaginacao } from "./UsePaginacao";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";

interface UseTabelaFetchConfig {
  endpoint: string;
  queryFiltro?: string;
}

interface BaseTabelaResponse<T = any> {
  dados: T[];
  total: number;
  totalPaginas?: number;
}

export function useBuscarDados<T = any>({
  endpoint,
  queryFiltro = "",
}: UseTabelaFetchConfig) {

  const {
    setRegistros,
    setData,
    setLoading,
    setRefresh,
    setPaginacao,
    paginacao
  } = UseTabela();

  const refresh = useCallback(() => {

    const pagina = paginacao?.paginaAtual;
const limite = paginacao?.porPagina;

    Read({
      endpoint,
      queryFiltro,
      pagina: paginacao ? pagina : "",
      limitePorPagina: paginacao ? limite : "",

      setRegistros,
      setData,
      setPaginacao,
      setLoadingSpiner: setLoading,
    });

  }, [endpoint, queryFiltro, paginacao?.paginaAtual,
  paginacao?.porPagina]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    setRefresh(() => refresh);
  }, [refresh]);

  return { refresh };
}